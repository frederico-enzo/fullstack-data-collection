import { NextResponse } from "next/server";
import { prisma } from "@/app/server/db";
import { PchSchema } from "@/app/schema/pch.shema";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = PchSchema.safeParse({
    ...body,
    usina_id: body.usina_id ? BigInt(body.usina_id) : null,
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    return NextResponse.json(
      parsed.error.flatten(),
      { status: 400 }
    );
  }

  const pch = await prisma.pch.create({ data: parsed.data });
  return NextResponse.json(pch, { status: 201 });
}
