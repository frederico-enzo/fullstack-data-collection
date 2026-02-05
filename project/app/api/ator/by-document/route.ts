import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("cnpj_cpf");

  if (!raw) {
    return NextResponse.json(
      { error: "CPF/CNPJ não informado" },
      { status: 400 }
    );
  }

  // remove máscara do que vem do frontend
  const clean = raw.replace(/\D/g, "");

  // busca ignorando pontuação no banco
  const result = await prisma.$queryRaw<any[]>`
    SELECT *
    FROM ator
    WHERE regexp_replace(cnpj_cpf, '\\D', '', 'g') = ${clean}
    LIMIT 1
  `;

  if (!result || result.length === 0) {
    return new NextResponse(null, { status: 204 });
  }

  const ator = result[0];

  return NextResponse.json(
    JSON.parse(
      JSON.stringify(ator, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      )
    )
  );
}
