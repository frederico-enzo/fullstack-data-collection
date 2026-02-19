import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = await prisma.pch.createMany({
    data: body.map((item: any) => ({
      geradora_id: item.usina_id,
      capacidade_instalada_mw: item.capacidade_instalada_mw,
      energia_gerada_mensal_mwh: item.energia_gerada_mensal_mwh,
      energia_gerada_anual_mwh: item.energia_gerada_anual_mwh,
      tipo_turbina: item.tipo_turbina,
      altura_queda_m: item.altura_queda_m,
      vazao_media_m3_s: item.vazao_media_m3_s,
      eficiencia_percent: item.eficiencia_percent,
      sistema_geracao_conectado_rede: item.sistema_geracao_conectado_rede,
    })),
  });

  return NextResponse.json(parsed);
}
