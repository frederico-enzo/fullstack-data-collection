import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mediaMensal =
      body.media_energia_gerada_mensal !== null &&
      body.media_energia_gerada_mensal !== undefined
        ? Number(body.media_energia_gerada_mensal)
        : null;

    const mediaAnual =
      mediaMensal !== null ? mediaMensal * 12 : null;

    const usina = await prisma.usina.create({
      data: {
        tecnologia: body.tecnologia,
        ator_id: BigInt(body.ator_id),
        municipio_id: BigInt(body.municipio_id),

        tipo_comprador: body.tipo_comprador,
        tipo_contrato: body.tipo_contrato,

        data_inicio_operacao: body.data_inicio_operacao
          ? new Date(body.data_inicio_operacao)
          : null,

        data_inicio_coleta: body.data_inicio_coleta
          ? new Date(body.data_inicio_coleta)
          : null,

        media_energia_gerada_mensal: mediaMensal,
        media_energia_gerada_anual: mediaAnual,
      },
    });

    return NextResponse.json(
      JSON.parse(
        JSON.stringify(usina, (_, v) =>
          typeof v === "bigint" ? v.toString() : v
        )
      ),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar geradora:", error);
    return NextResponse.json(
      { error: "Erro ao criar geradora" },
      { status: 500 }
    );
  }
}
