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
      area_ocupada_m2: parseOptionalNumber(
        body.area_ocupada_m2,
        "area_ocupada_m2"
      ),
      numero_modulos: parseOptionalInt(body.numero_modulos, "numero_modulos"),
      tipo_modulo: parseOptionalString(body.tipo_modulo),
      potencia_unitaria_modulo_w: parseOptionalInt(
        body.potencia_unitaria_modulo_w,
        "potencia_unitaria_modulo_w"
      ),
      tipo_inversor: parseOptionalString(body.tipo_inversor),
      quantidade_inversores: parseOptionalInt(
        body.quantidade_inversores,
        "quantidade_inversores"
      ),
      tensao_nominal_sistema_v: parseOptionalInt(
        body.tensao_nominal_sistema_v,
        "tensao_nominal_sistema_v"
      ),
      irradiacao_media_kwh_m2_ano: parseOptionalNumber(
        body.irradiacao_media_kwh_m2_ano,
        "irradiacao_media_kwh_m2_ano"
      ),
      temperatura_media_operacao_c: parseOptionalNumber(
        body.temperatura_media_operacao_c,
        "temperatura_media_operacao_c"
      ),
      inclinacao_graus: parseOptionalNumber(
        body.inclinacao_graus,
        "inclinacao_graus"
      ),
      orientacao_modulos: parseOptionalString(body.orientacao_modulos),
      area_desmatada_ha: parseOptionalNumber(
        body.area_desmatada_ha,
        "area_desmatada_ha"
      ),
      area_reaproveitada_ha: parseOptionalNumber(
        body.area_reaproveitada_ha,
        "area_reaproveitada_ha"
      ),
      tipo_conexao: parseOptionalString(body.tipo_conexao),
      fase: parseOptionalString(body.fase),
    };

    const fotovoltaico = await prisma.fotovoltaico.upsert({
      where: { geradora_id: geradoraId },
      update: data,
      create: {
        geradora_id: geradoraId,
        ...data,
      },
    });

    return NextResponse.json(safeJson(fotovoltaico), { status: 201 });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error.message.includes("Campo")) ||
      (error instanceof Error && error.message.includes("Payload"))
    ) {
      return badRequest(error);
    }

    console.error("Error creating/updating fotovoltaico:", error);
    return NextResponse.json(
      { error: "Failed to create/update fotovoltaico" },
      { status: 500 }
    );
  }
}
