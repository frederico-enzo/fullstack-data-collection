import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";


export async function GET() {
  const atores = await prisma.ator.findMany();
  const safe = JSON.parse(
    JSON.stringify(atores, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
  return NextResponse.json(safe);
}

export async function POST(req: Request) {
  const body = await req.json();

  const ator = await prisma.ator.create({
    data: {
      nome: body.nome,
      telefone: body.telefone,
      email: body.email,
      cnpj_cpf: body.cnpj_cpf,
    },
  });
  return NextResponse.json(
    JSON.parse(
      JSON.stringify(body, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      )
    ),
    { status: 201 }
  );
}