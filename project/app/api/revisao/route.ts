import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";
import { safeJson } from "../tecnologia/_helpers";

function parseQueryBigInt(value: string | null, fieldName: string): bigint {
  if (!value || !/^-?\d+$/.test(value.trim())) {
    throw new Error(`Parâmetro ${fieldName} é obrigatório e deve ser inteiro.`);
  }

  return BigInt(value.trim());
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const atorId = parseQueryBigInt(searchParams.get("ator_id"), "ator_id");
    const usinaId = parseQueryBigInt(searchParams.get("usina_id"), "usina_id");

    const [ator, geradora, equipamentos] = await Promise.all([
      prisma.ator.findUnique({ where: { id: atorId } }),
      prisma.geradora.findUnique({
        where: { id: usinaId },
        include: {
          fotovoltaico: true,
          biogas: true,
          pch: true,
          armazenamento: true,
          municipio: true,
        },
      }),
      prisma.geradora_equipamento.findMany({
        where: { geradora_id: usinaId },
        include: { equipamento: true },
      }),
    ]);

    let tecnologia = null;
    if (geradora?.tecnologia === "FOTOVOLTAICA") tecnologia = geradora.fotovoltaico;
    if (geradora?.tecnologia === "BIOGAS") tecnologia = geradora.biogas;
    if (geradora?.tecnologia === "PCH") tecnologia = geradora.pch;
    if (geradora?.tecnologia === "ARMAZENAMENTO") tecnologia = geradora.armazenamento;

    return NextResponse.json(
      safeJson({
        ator,
        geradora,
        tecnologia,
        equipamentos: equipamentos.map((item) => item.equipamento),
      })
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao carregar revisão.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
