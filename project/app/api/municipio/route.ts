//api/muncipio/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";


export async function GET() {
    const municipios = await prisma.municipio.findMany();
    const safe = JSON.parse(
        JSON.stringify(municipios, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );
    return NextResponse.json(safe);
}
