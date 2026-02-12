import { z } from "zod";

export const pchSchema = z.object({
  id: z.coerce.bigint(),

  usina_id: z.coerce.bigint().optional(),

  rio_aproveitado: z.string().optional(),

  vazao_media_m3s: z.string().optional(),
  vazao_turbinada_m3s: z.string().optional(),

  queda_bruta_m: z.string().optional(),
  queda_liquida_m: z.string().optional(),

  tipo_turbina: z.string().optional(),
  numero_turbinas: z.number().int().optional(),

  potencia_unitaria_turbina_mw: z.string().optional(),

  rendimento_turbina_percent: z.string().optional(),
  rendimento_gerador_percent: z.string().optional(),
  eficiencia_global_percent: z.string().optional(),

  tipo_gerador: z.string().optional(),

  tensao_nominal_sistema_kv: z.string().optional(),

  sistema_regulacao: z.string().optional(),
  nivel_tensao_conexao: z.string().optional(),
  subestacao_conexao: z.string().optional(),
  distribuidora_vinculada: z.string().optional(),
});
