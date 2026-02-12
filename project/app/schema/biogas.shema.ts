import { z } from "zod";

export const biogasSchema = z.object({
  id: z.coerce.bigint(),

  usina_id: z.coerce.bigint().optional().nullable(),

  capacidade_instalada_mw: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  energia_gerada_mensal_mwh: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  energia_gerada_anual_mwh: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  tipo_substrato: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  quantidade_processada_t_dia: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  teor_solidos_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  tipo_biodigestor: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  tratamento_biogas: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  equipamento_conversao: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  eficiencia_eletrica_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  eficiencia_termica_percent: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  sistema_queima_excedente: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  producao_biogas_nm3_dia: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  pressao_media_bar: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  temperatura_media_c: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  reducao_emissoes_tco2eq_ano: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  destinacao_digestato: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),
})
.refine(
  data => data.capacidade_instalada_mw || data.producao_biogas_nm3_dia,
  {
    message: "Informe ao menos capacidade instalada ou produção diária de biogás",
    path: ["capacidade_instalada_mw"],
  }
);
