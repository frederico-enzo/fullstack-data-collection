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
    try {
        const body = await req.json();

        const ator = await prisma.ator.create({
            data: {
                nome: body.nome,
                telefone: body.telefone || null,
                email: body.email || null,
                cnpj_cpf: body.cnpj_cpf || null,
            },
        });

        const safe = JSON.parse(
            JSON.stringify(ator, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        return NextResponse.json(safe);

    } catch (error: any) {
        if (error.code === "P2002") {
            const campo = error.meta?.target?.[0];

            if (campo === "email") {
                return NextResponse.json(
                    { error: "Email já cadastrado." },
                    { status: 400 }
                );
            }

            if (campo === "cnpj_cpf") {
                return NextResponse.json(
                    { error: "CPF/CNPJ já cadastrado." },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { error: "Campo duplicado." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}