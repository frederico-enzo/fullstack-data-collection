import { z } from "zod";

export const armazenamentoSchema = z.object({
  id: z.coerce.bigint(),

  usina_id: z.coerce.bigint().optional().nullable(),

  fator_capacidade_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  tecnologia_bateria: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  fabricante_bateria: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  quantidade_modulos: z
    .number()
    .int("Quantidade de módulos deve ser inteiro")
    .positive("Quantidade de módulos deve ser maior que zero")
    .optional()
    .nullable(),

  capacidade_unitaria_kwh: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  tensao_nominal_sistema_v: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  corrente_nominal_a: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  profundidade_descarga_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  vida_util_ciclos: z
    .number()
    .int("Vida útil deve ser inteiro")
    .positive("Vida útil deve ser maior que zero")
    .optional()
    .nullable(),

  tempo_recarga_horas: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  temperatura_operacao_c: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  sistema_gerenciamento_bms: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  sistema_conversao_potencia: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  eficiencia_conversao_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  modalidade_operacao: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  tipo_conexao: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  nivel_tensao_conexao: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),
})
.refine(
  data => data.quantidade_modulos || data.capacidade_unitaria_kwh,
  {
    message: "Informe ao menos quantidade de módulos ou capacidade unitária",
    path: ["quantidade_modulos"],
  }
);
