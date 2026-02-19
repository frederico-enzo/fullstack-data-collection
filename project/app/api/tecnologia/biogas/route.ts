import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const biogas = await prisma.biogas.create({
      data: {
        geradora_id: body.usina_id,
        capacidade_instalada_mw: body.capacidade_instalada_mw,
        energia_gerada_mensal_mwh: body.energia_gerada_mensal_mwh,
        energia_gerada_anual_mwh: body.energia_gerada_anual_mwh,
        tipo_substrato: body.tipo_substrato,
        quantidade_processada_t_dia: body.quantidade_processada_t_dia,
        teor_solidos_percent: body.teor_solidos_percent,
        tipo_biodigestor: body.tipo_biodigestor,
        tratamento_biogas: body.tratamento_biogas,
        equipamento_conversao: body.equipamento_conversao,
        eficiencia_eletrica_percent: body.eficiencia_eletrica_percent,
        eficiencia_termica_percent: body.eficiencia_termica_percent,
        sistema_queima_excedente: body.sistema_queima_excedente,
        producao_biogas_nm3_dia: body.producao_biogas_nm3_dia,
        pressao_media_bar: body.pressao_media_bar,
        temperatura_media_c: body.temperatura_media_c,
        reducao_emissoes_tco2eq_ano: body.reducao_emissoes_tco2eq_ano,
        destinacao_digestato: body.destinacao_digestato,
      },
    });

    return NextResponse.json(biogas);
  } catch (error) {
    console.error("Error creating biogas:", error);
    return NextResponse.json(
      { error: "Failed to create biogas" },
      { status: 500 }
    );
  }
}
