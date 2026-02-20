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
} from "../_helpers";

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const body = parseRequestBodyObject(rawBody);
    const geradoraId = parseUsinaId(body.usina_id);

    const data = {
      rio_aproveitado: parseOptionalString(body.rio_aproveitado),
      vazao_media_m3s: parseOptionalNumber(body.vazao_media_m3s, "vazao_media_m3s"),
      vazao_turbinada_m3s: parseOptionalNumber(
        body.vazao_turbinada_m3s,
        "vazao_turbinada_m3s"
      ),
      queda_bruta_m: parseOptionalNumber(body.queda_bruta_m, "queda_bruta_m"),
      queda_liquida_m: parseOptionalNumber(body.queda_liquida_m, "queda_liquida_m"),
      tipo_turbina: parseOptionalString(body.tipo_turbina),
      numero_turbinas: parseOptionalInt(body.numero_turbinas, "numero_turbinas"),
      potencia_unitaria_turbina_mw: parseOptionalNumber(
        body.potencia_unitaria_turbina_mw,
        "potencia_unitaria_turbina_mw"
      ),
      rendimento_turbina_percent: parseOptionalNumber(
        body.rendimento_turbina_percent,
        "rendimento_turbina_percent"
      ),
      rendimento_gerador_percent: parseOptionalNumber(
        body.rendimento_gerador_percent,
        "rendimento_gerador_percent"
      ),
      eficiencia_global_percent: parseOptionalNumber(
        body.eficiencia_global_percent,
        "eficiencia_global_percent"
      ),
      tipo_gerador: parseOptionalString(body.tipo_gerador),
      tensao_nominal_sistema_kv: parseOptionalNumber(
        body.tensao_nominal_sistema_kv,
        "tensao_nominal_sistema_kv"
      ),
      sistema_regulacao: parseOptionalString(body.sistema_regulacao),
      nivel_tensao_conexao: parseOptionalString(body.nivel_tensao_conexao),
      subestacao_conexao: parseOptionalString(body.subestacao_conexao),
      distribuidora_vinculada: parseOptionalString(body.distribuidora_vinculada),
    };

    const pch = await prisma.pch.upsert({
      where: { geradora_id: geradoraId },
      update: data,
      create: {
        geradora_id: geradoraId,
        ...data,
      },
    });

    return NextResponse.json(safeJson(pch), { status: 201 });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error.message.includes("Campo")) ||
      (error instanceof Error && error.message.includes("Payload"))
    ) {
      return badRequest(error);
    }

    console.error("Error creating/updating pch:", error);
    return NextResponse.json(
      { error: "Failed to create/update pch" },
      { status: 500 }
    );
  }
}
