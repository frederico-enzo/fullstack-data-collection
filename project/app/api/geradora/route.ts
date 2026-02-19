import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";


export async function GET() {
  const geradoras = await prisma.geradora.findMany();
  const safe = JSON.parse(
    JSON.stringify(geradoras, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
  return NextResponse.json(safe);
}


export async function POST(req: Request) {
  const body = await req.json();

  const geradora = await prisma.geradora.create({
    data: {
      municipio_id: body.municipio_id,
      ator_id: body.ator_id,
      tecnologia: body.tecnologia,
      data_inicio_coleta: body.data_inicio_coleta,
      data_inicio_operacao: body.data_inicio_operacao,
      tipo_comprador: body.tipo_comprador,
      tipo_contrato: body.tipo_contrato,

      media_energia_gerada_mensal: body.media_energia_gerada_mensal,
      media_volume_vendido:
        body.media_volume_vendido ?? body.media_volume_vendido_mensal ?? null,
      reducao_co2_ano: body.reducao_co2_ano ?? body.media_reducao_co2_mensal ?? null,
      capacidade_anual_geracao:
        body.capacidade_anual_geracao ??
        body.capacidade_total_geracao ??
        body.capacidade_total_instalada ??
        null,

    },
  });
  return NextResponse.json(
    JSON.parse(
      JSON.stringify(geradora, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      )
    ),
    { status: 201 }
  )
}
