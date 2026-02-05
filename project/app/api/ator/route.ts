import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";
import { atorSchema } from "@/app/schema/ator.schema";
import { Prisma } from "@prisma/client";


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
    try {
        const body = await req.json();

        const parsed = atorSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Dados inválidos",
                    details: parsed.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = parsed.data;

        const existente = await prisma.ator.findFirst({
            where: {
                OR: [
                    data.email ? { email: data.email } : undefined,
                    data.cnpj_cpf ? { cnpj_cpf: data.cnpj_cpf } : undefined,
                ].filter((item): item is Exclude<typeof item, undefined> => item !== undefined),
            },
        });

        if (existente) {
            return NextResponse.json(
                { error: "Ator já cadastrado com os dados informados." },
                { status: 409 }
            );
        }

        const ator = await prisma.ator.create({ data });

        return NextResponse.json(
            JSON.parse(
                JSON.stringify(ator, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return NextResponse.json(
                    { error: "Violação de unicidade no banco." },
                    { status: 409 }
                );
            }
        }

        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}