import { z } from "zod";

export const equipamentoSchema = z.object({
  id: z.coerce.bigint(),

  tipo_equipamento: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  fabricante: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  modelo: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  potencia_nominal: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  eficiencia_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  ano_fabricacao: z
    .number()
    .int("Ano de fabricação deve ser inteiro")
    .min(1900, "Ano inválido")
    .max(new Date().getFullYear(), "Ano não pode ser no futuro")
    .optional()
    .nullable(),

  valor: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  vida_util_anos: z
    .number()
    .int("Vida útil deve ser inteiro")
    .positive("Vida útil deve ser maior que zero")
    .optional()
    .nullable(),

  usina_equipamento: z.array(z.any()).optional(),
})
.refine(
  data => data.tipo_equipamento || data.potencia_nominal,
  {
    message: "Informe ao menos tipo de equipamento ou potência nominal",
    path: ["tipo_equipamento"],
  }
);
