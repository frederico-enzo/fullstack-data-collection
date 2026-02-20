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
      fator_capacidade_percent: parseOptionalNumber(
        body.fator_capacidade_percent,
        "fator_capacidade_percent"
      ),
      tecnologia_bateria: parseOptionalString(body.tecnologia_bateria),
      fabricante_bateria: parseOptionalString(body.fabricante_bateria),
      quantidade_modulos: parseOptionalInt(
        body.quantidade_modulos,
        "quantidade_modulos"
      ),
      capacidade_unitaria_kwh: parseOptionalNumber(
        body.capacidade_unitaria_kwh,
        "capacidade_unitaria_kwh"
      ),
      tensao_nominal_sistema_v: parseOptionalNumber(
        body.tensao_nominal_sistema_v,
        "tensao_nominal_sistema_v"
      ),
      corrente_nominal_a: parseOptionalNumber(
        body.corrente_nominal_a,
        "corrente_nominal_a"
      ),
      profundidade_descarga_percent: parseOptionalNumber(
        body.profundidade_descarga_percent,
        "profundidade_descarga_percent"
      ),
      vida_util_ciclos: parseOptionalInt(
        body.vida_util_ciclos,
        "vida_util_ciclos"
      ),
      tempo_recarga_horas: parseOptionalNumber(
        body.tempo_recarga_horas,
        "tempo_recarga_horas"
      ),
      temperatura_operacao_c: parseOptionalNumber(
        body.temperatura_operacao_c,
        "temperatura_operacao_c"
      ),
      sistema_gerenciamento_bms: parseOptionalString(
        body.sistema_gerenciamento_bms
      ),
      sistema_conversao_potencia: parseOptionalString(
        body.sistema_conversao_potencia
      ),
      eficiencia_conversao_percent: parseOptionalNumber(
        body.eficiencia_conversao_percent,
        "eficiencia_conversao_percent"
      ),
      modalidade_operacao: parseOptionalString(body.modalidade_operacao),
      tipo_conexao: parseOptionalString(body.tipo_conexao),
      nivel_tensao_conexao: parseOptionalString(body.nivel_tensao_conexao),
    };

    const armazenamento = await prisma.armazenamento.upsert({
      where: { geradora_id: geradoraId },
      update: data,
      create: {
        geradora_id: geradoraId,
        ...data,
      },
    });

    return NextResponse.json(safeJson(armazenamento), { status: 201 });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error.message.includes("Campo")) ||
      (error instanceof Error && error.message.includes("Payload"))
    ) {
      return badRequest(error);
    }

    console.error("Error creating/updating armazenamento:", error);
    return NextResponse.json(
      { error: "Failed to create/update armazenamento" },
      { status: 500 }
    );
  }
}
