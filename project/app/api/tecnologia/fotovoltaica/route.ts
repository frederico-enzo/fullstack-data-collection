import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fotovoltaico = await prisma.fotovoltaico.create({
      data: {
        geradora_id: body.usina_id,
        area_ocupada_m2: body.area_ocupada_m2,
        numero_modulos: body.numero_modulos,
        tipo_modulo: body.tipo_modulo,
        potencia_unitaria_modulo_w: body.potencia_unitaria_modulo_w,
        tipo_inversor: body.tipo_inversor,
        quantidade_inversores: body.quantidade_inversores,
        tensao_nominal_sistema_v: body.tensao_nominal_sistema_v,
        irradiacao_media_kwh_m2_ano: body.irradiacao_media_kwh_m2_ano,
        temperatura_media_operacao_c: body.temperatura_media_operacao_c,
        inclinacao_graus: body.inclinacao_graus,
        orientacao_modulos: body.orientacao_modulos,
        area_desmatada_ha: body.area_desmatada_ha,
        area_reaproveitada_ha: body.area_reaproveitada_ha,
      },
    });

    return NextResponse.json(fotovoltaico);
  } catch (error) {
    console.error("Error creating fotovoltaico:", error);
    return NextResponse.json(
      { error: "Failed to create fotovoltaico" },
      { status: 500 }
    );
  }
}
