import { z } from "zod";

export const PchSchema = z.object({
 usina_id: z.bigint(),

  rio_aproveitado: z.string().min(1, "Informe o rio aproveitado"),

  vazao_media_m3s: z
    .number()
    .positive("Vazão média deve ser maior que zero"),

  vazao_turbinada_m3s: z
    .number()
    .positive("Vazão turbinada deve ser maior que zero"),

  queda_bruta_m: z
    .number()
    .positive("Queda bruta deve ser maior que zero"),

  queda_liquida_m: z
    .number()
    .positive("Queda líquida deve ser maior que zero"),

  tipo_turbina: z.enum([
    "Francis",
    "Kaplan",
    "Pelton",
    "Bulbo",
    "Outra",
  ]),

  numero_turbinas: z
    .number()
    .int()
    .min(1, "Deve haver ao menos uma turbina"),

  potencia_unitaria_turbina_mw: z
    .number()
    .positive("Potência unitária deve ser positiva"),

  potencia_instalada_total_mw: z
    .number()
    .positive()
    .max(30, "PCH deve ter potência instalada ≤ 30 MW"),

  rendimento_turbina_percent: z
    .number()
    .min(0)
    .max(100),

  rendimento_gerador_percent: z
    .number()
    .min(0)
    .max(100),

  eficiencia_global_percent: z
    .number()
    .min(0)
    .max(100),

  tipo_gerador: z.enum([
    "Síncrono",
    "Assíncrono",
  ]),

  tensao_nominal_sistema_kv: z
    .number()
    .positive(),

  nivel_tensao_conexao_kv: z
    .number()
    .positive(),

  sistema_regulacao: z.string().min(1),

  subestacao_conexao: z.string().min(1),

  distribuidora_vinculada: z.string().min(1),
})
.refine(
  (data) => data.queda_liquida_m <= data.queda_bruta_m,
  {
    message: "Queda líquida não pode ser maior que a queda bruta",
    path: ["queda_liquida_m"],
  }
)
.refine(
  (data) =>
    data.potencia_unitaria_turbina_mw * data.numero_turbinas ===
    data.potencia_instalada_total_mw,
  {
    message: "Potência instalada deve ser igual à soma das turbinas",
    path: ["potencia_instalada_total_mw"],
  }
);
