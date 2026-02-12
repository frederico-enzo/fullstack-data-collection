import { z } from "zod";
import {
  tecnologia_enum,
  comprador_enum,
  contrato_enum,
} from "@prisma/client";

import { armazenamentoSchema } from "./bess.shema";
import { biogasSchema } from "./biogas.shema";
import { fotovoltaicoSchema } from "./fotovoltaica.schema";
import { pchSchema } from "./pch.shema";

export const usinaSchema = z.object({
  id: z.coerce.bigint(),

  ator_id: z.coerce.bigint(),
  municipio_id: z.coerce.bigint(),

  data_inicio_operacao: z
    .coerce
    .date()
    .optional()
    .nullable(),

  data_inicio_coleta: z
    .coerce
    .date()
    .optional()
    .nullable(),

 
  reducao_co2_ano: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  media_energia_gerada_anual: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  media_energia_gerada_mensal: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  media_volume_vendido: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  capacidade_anual_geracao: z
    .string()
    .optional()
    .nullable()
    .transform(v => v?.trim() || null),

  armazenamento: armazenamentoSchema.optional().nullable(),
  biogas: biogasSchema.optional().nullable(),
  fotovoltaico: fotovoltaicoSchema.optional().nullable(),
  pch: pchSchema.optional().nullable(),

  ator: z.any().optional(),
  municipio: z.any().optional(),
  usina_equipamento: z.array(z.any()).optional(),
})


