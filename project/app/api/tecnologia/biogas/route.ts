import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";
import {
  badRequest,
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
      tipo_substrato: parseOptionalString(body.tipo_substrato),
      quantidade_processada_t_dia: parseOptionalNumber(
        body.quantidade_processada_t_dia,
        "quantidade_processada_t_dia"
      ),
      teor_solidos_percent: parseOptionalNumber(
        body.teor_solidos_percent,
        "teor_solidos_percent"
      ),
      tipo_biodigestor: parseOptionalString(body.tipo_biodigestor),
      tratamento_biogas: parseOptionalString(body.tratamento_biogas),
      equipamento_conversao: parseOptionalString(body.equipamento_conversao),
      eficiencia_eletrica_percent: parseOptionalNumber(
        body.eficiencia_eletrica_percent,
        "eficiencia_eletrica_percent"
      ),
      eficiencia_termica_percent: parseOptionalNumber(
        body.eficiencia_termica_percent,
        "eficiencia_termica_percent"
      ),
      sistema_queima_excedente: parseOptionalString(
        body.sistema_queima_excedente
      ),
      producao_biogas_nm3_dia: parseOptionalNumber(
        body.producao_biogas_nm3_dia,
        "producao_biogas_nm3_dia"
      ),
      pressao_media_bar: parseOptionalNumber(
        body.pressao_media_bar,
        "pressao_media_bar"
      ),
      temperatura_media_c: parseOptionalNumber(
        body.temperatura_media_c,
        "temperatura_media_c"
      ),
      destinacao_digestato: parseOptionalString(body.destinacao_digestato),
    };

    const biogas = await prisma.biogas.upsert({
      where: { geradora_id: geradoraId },
      update: data,
      create: {
        geradora_id: geradoraId,
        ...data,
      },
    });

    return NextResponse.json(safeJson(biogas), { status: 201 });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error.message.includes("Campo")) ||
      (error instanceof Error && error.message.includes("Payload"))
    ) {
      return badRequest(error);
    }

    console.error("Error creating/updating biogas:", error);
    return NextResponse.json(
      { error: "Failed to create/update biogas" },
      { status: 500 }
    );
  }
}
