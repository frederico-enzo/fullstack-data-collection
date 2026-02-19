import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";

const parseDateField = (value: unknown, fieldName: string) => {
  if (value == null || value === "") return null;
  if (value instanceof Date) return value;

  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string or Date`);
  }

  const trimmed = value.trim();
  if (!trimmed) return null;

  const [datePart, ...timeParts] = trimmed.split(/\s+/);
  const timePart = timeParts.join(" ");
  const [day, month, year] = datePart.split("/");
  const isoDate =
    day && month && year
      ? `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`
      : datePart;

  const candidate = timePart ? `${isoDate}T${timePart}` : isoDate;
  const parsed = new Date(candidate);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${fieldName} is not a valid date`);
  }

  return parsed;
};


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
  let data_inicio_coleta: Date | null = null;
  let data_inicio_operacao: Date | null = null;

  try {
    data_inicio_coleta = parseDateField(
      body.data_inicio_coleta,
      "data_inicio_coleta"
    );
    data_inicio_operacao = parseDateField(
      body.data_inicio_operacao,
      "data_inicio_operacao"
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid date";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const geradora = await prisma.geradora.create({
    data: {
      municipio_id: body.municipio_id,
      ator_id: body.ator_id,
      tecnologia: body.tecnologia,
      data_inicio_coleta,
      data_inicio_operacao,
      tipo_comprador: body.tipo_comprador,
      tipo_contrato: body.tipo_contrato,
      media_energia_gerada_mensal: body.media_energia_gerada_mensal,
      media_volume_vendido_mensal: body.media_volume_vendido_mensal ?? null,
      media_reducao_co2_mensal: body.media_reducao_co2_mensal ?? null,
      capacidade_total_instalada: body.capacidade_total_instalada ?? null,
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
