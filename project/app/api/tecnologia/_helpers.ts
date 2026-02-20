import { NextResponse } from "next/server";

export type BodyRecord = Record<string, unknown>;

function isEmpty(value: unknown) {
  return value === null || value === undefined || value === "";
}

export function parseUsinaId(value: unknown): bigint {
  if (typeof value === "bigint") return value;

  if (typeof value === "number" && Number.isInteger(value)) {
    return BigInt(value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^-?\d+$/.test(trimmed)) {
      return BigInt(trimmed);
    }
  }

  throw new Error("Campo usina_id é obrigatório e deve ser inteiro.");
}

export function parseOptionalString(value: unknown): string | null {
  if (isEmpty(value)) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }

  return String(value);
}

export function parseOptionalNumber(
  value: unknown,
  fieldName: string
): number | null {
  if (isEmpty(value)) return null;

  let parsed: number;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;
    parsed = Number(trimmed);
  } else {
    parsed = typeof value === "number" ? value : Number(value);
  }

  if (!Number.isFinite(parsed)) {
    throw new Error(`Campo ${fieldName} deve ser numérico.`);
  }

  return parsed;
}

export function parseOptionalInt(
  value: unknown,
  fieldName: string
): number | null {
  const parsed = parseOptionalNumber(value, fieldName);

  if (parsed === null) return null;

  if (!Number.isInteger(parsed)) {
    throw new Error(`Campo ${fieldName} deve ser inteiro.`);
  }

  return parsed;
}

export function parseRequestBodyObject(body: unknown): BodyRecord {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Payload deve ser um objeto JSON.");
  }

  return body as BodyRecord;
}

export function safeJson<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_, currentValue) =>
      typeof currentValue === "bigint"
        ? currentValue.toString()
        : currentValue
    )
  ) as T;
}

export function badRequest(error: unknown) {
  const message = error instanceof Error ? error.message : "Dados inválidos.";
  return NextResponse.json({ error: message }, { status: 400 });
}
