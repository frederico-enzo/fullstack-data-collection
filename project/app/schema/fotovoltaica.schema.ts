import { z } from "zod";

export const fotovoltaicoSchema = z.object({
  id: z.coerce.bigint(),

  usina_id: z.coerce.bigint().optional().nullable(),

  area_ocupada_m2: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  numero_modulos: z
    .number()
    .int("Número de módulos deve ser inteiro")
    .positive("Número de módulos deve ser maior que zero")
    .optional()
    .nullable(),

  tipo_modulo: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  eficiencia_modulos_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  potencia_unitaria_modulo_w: z
    .number()
    .int("Potência do módulo deve ser inteiro")
    .positive("Potência deve ser maior que zero")
    .optional()
    .nullable(),

  tipo_inversor: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  quantidade_inversores: z
    .number()
    .int("Quantidade de inversores deve ser inteiro")
    .positive("Quantidade deve ser maior que zero")
    .optional()
    .nullable(),

  eficiencia_media_inversores_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  tensao_nominal_sistema_v: z
    .number()
    .int("Tensão nominal deve ser inteiro")
    .positive("Tensão deve ser maior que zero")
    .optional()
    .nullable(),

  irradiacao_media_kwh_m2_ano: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  temperatura_media_operacao_c: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  inclinacao_graus: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  orientacao_modulos: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  area_desmatada_ha: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  area_reaproveitada_ha: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),
})
.refine(
  data => data.numero_modulos || data.potencia_unitaria_modulo_w,
  {
    message: "Informe ao menos número de módulos ou potência unitária",
    path: ["numero_modulos"],
  }
);
