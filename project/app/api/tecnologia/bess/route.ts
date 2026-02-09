import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const armazenamento = await prisma.armazenamento.create({
      data: {
        usina_id: body.usina_id,
        fator_capacidade_percent: body.fator_capacidade_percent,
        tecnologia_bateria: body.tecnologia_bateria,
        fabricante_bateria: body.fabricante_bateria,
        quantidade_modulos: body.quantidade_modulos,
        capacidade_unitaria_kwh: body.capacidade_unitaria_kwh,
        tensao_nominal_sistema_v: body.tensao_nominal_sistema_v,
        corrente_nominal_a: body.corrente_nominal_a,
        profundidade_descarga_percent: body.profundidade_descarga_percent,
        vida_util_ciclos: body.vida_util_ciclos,
        tempo_recarga_horas: body.tempo_recarga_horas,
        temperatura_operacao_c: body.temperatura_operacao_c,
        sistema_gerenciamento_bms: body.sistema_gerenciamento_bms,
        sistema_conversao_potencia: body.sistema_conversao_potencia,
        eficiencia_conversao_percent: body.eficiencia_conversao_percent,
        modalidade_operacao: body.modalidade_operacao,
        tipo_conexao: body.tipo_conexao,
        nivel_tensao_conexao: body.nivel_tensao_conexao,
      },
    });

    return NextResponse.json(armazenamento);
  } catch (error) {
    console.error("Error creating armazenamento:", error);
    return NextResponse.json(
      { error: "Failed to create armazenamento" },
      { status: 500 }
    );
  }
}
