import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";
import {
  badRequest,
  parseOptionalInt,
  parseOptionalNumber,
  parseOptionalString,
  parseRequestBodyObject,
  parseUsinaId,
  safeJson,
} from "../tecnologia/_helpers";

function parseOptionalBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }

  return false;
}

function parseOptionalBigInt(value: unknown): bigint | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "bigint") return value;

  if (typeof value === "number" && Number.isInteger(value)) {
    return BigInt(value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;
    if (/^-?\d+$/.test(trimmed)) {
      return BigInt(trimmed);
    }
  }

  throw new Error("Campo equipamento_id deve ser inteiro.");
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim();
    const limitRaw = searchParams.get("limit");
    const limit = Math.min(
      100,
      Math.max(
        1,
        limitRaw && /^\d+$/.test(limitRaw) ? Number.parseInt(limitRaw, 10) : 20
      )
    );

    const equipamentos = await prisma.equipamento.findMany({
      where: search
        ? {
            OR: [
              { tipo_equipamento: { contains: search, mode: "insensitive" } },
              { fabricante: { contains: search, mode: "insensitive" } },
              { modelo: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { id: "desc" },
      take: limit,
      select: {
        id: true,
        tipo_equipamento: true,
        fabricante: true,
        modelo: true,
        ano_fabricacao: true,
      },
    });

    return NextResponse.json(safeJson(equipamentos));
  } catch (error) {
    console.error("Error listing equipamentos:", error);
    return NextResponse.json(
      { error: "Failed to list equipamentos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const body = parseRequestBodyObject(rawBody);
    const geradoraId = parseUsinaId(body.usina_id);
    const equipamentoId = parseOptionalBigInt(body.equipamento_id);
    const vincularExistente = parseOptionalBoolean(body.vincular_existente);

    const data = () => ({
      tipo_equipamento: parseOptionalString(body.tipo_equipamento),
      fabricante: parseOptionalString(body.fabricante),
      modelo: parseOptionalString(body.modelo),
      potencia_nominal: parseOptionalNumber(
        body.potencia_nominal,
        "potencia_nominal"
      ),
      eficiencia_percent: parseOptionalNumber(
        body.eficiencia_percent,
        "eficiencia_percent"
      ),
      ano_fabricacao: parseOptionalInt(body.ano_fabricacao, "ano_fabricacao"),
      valor: parseOptionalNumber(body.valor, "valor"),
      vida_util_anos: parseOptionalInt(body.vida_util_anos, "vida_util_anos"),
    });

    const equipamento = await prisma.$transaction(async (tx) => {
      if (equipamentoId && vincularExistente) {
        const existingEquipamento = await tx.equipamento.findUnique({
          where: { id: equipamentoId },
        });

        if (!existingEquipamento) {
          throw new Error("Equipamento não encontrado.");
        }

        const existingRelation = await tx.geradora_equipamento.findFirst({
          where: {
            geradora_id: geradoraId,
            equipamento_id: equipamentoId,
          },
        });

        if (!existingRelation) {
          await tx.geradora_equipamento.create({
            data: {
              geradora_id: geradoraId,
              equipamento_id: equipamentoId,
            },
          });
        }

        return existingEquipamento;
      }

      if (equipamentoId) {
        const updatedEquipamento = await tx.equipamento.update({
          where: { id: equipamentoId },
          data: data(),
        });

        const existingRelation = await tx.geradora_equipamento.findFirst({
          where: {
            geradora_id: geradoraId,
            equipamento_id: equipamentoId,
          },
        });

        if (!existingRelation) {
          await tx.geradora_equipamento.create({
            data: {
              geradora_id: geradoraId,
              equipamento_id: equipamentoId,
            },
          });
        }

        return updatedEquipamento;
      }

      const createdEquipamento = await tx.equipamento.create({ data: data() });

      await tx.geradora_equipamento.create({
        data: {
          geradora_id: geradoraId,
          equipamento_id: createdEquipamento.id,
        },
      });

      return createdEquipamento;
    });

    return NextResponse.json(safeJson(equipamento), { status: 201 });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error.message.includes("Campo")) ||
      (error instanceof Error && error.message.includes("Payload"))
    ) {
      return badRequest(error);
    }

    console.error("Error creating equipamento:", error);
    return NextResponse.json(
      { error: "Failed to create equipamento" },
      { status: 500 }
    );
  }
}
