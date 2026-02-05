import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";


export async function GET() {
    const geradores = await prisma.usina.findMany();
    const safe = JSON.parse(
        JSON.stringify(geradores, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );
    return NextResponse.json(safe);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const gerador = await prisma.usina.create({
            data: {
                tecnologia: body.tecnologia,
                ator_id: body.ator_id,
                data_inicio_operacao: body.data_inicio_operacao,
                data_inicio_coleta: body.data_inicio_coleta,
                municipio_id: body.municipio_id,
                tipo_comprador: body.tipo_comprador,
                tipo_contrato: body.tipo_contrato,
                reducao_co2_ano: body.reducao_co2_ano,
                media_energia_gerada_anual: body.media_energia_gerada_anual,
                media_energia_gerada_mensal: body.media_energia_gerada_mensal,
                media_volume_vendido: body.media_volume_vendido,
                capacidade_anual_geracao: body.capacidade_anual_geracao,
                armazenamento: body.armazenamento,
                biogas: body.biogas,
                fotovoltaico: body.fotovoltaico,
                pch: body.pch,
                ator: body.ator,
                municipio: body.municipio,
                usina_equipamento: body.usina_equipamento   
            },
        });
        const safe = JSON.parse(
            JSON.stringify(gerador, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );
        return NextResponse.json(safe);            
    } catch (error) { 
        console.error("Error creating gerador:", error);
        return NextResponse.json({ error: "Failed to create gerador" }, { status: 500 });
    }
}  