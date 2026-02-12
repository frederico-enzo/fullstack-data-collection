import { z } from "zod";

export const atorSchema = z.object({
    id: z.coerce.bigint(),

    nome: z
        .string()
        .min(3, "Nome deve ter ao menos 3 caracteres")
        .max(255)
        .transform(v => v.trim()),

    telefone: z
        .string()
        .max(20)
        .optional()
        .nullable()
        .transform(v => v?.trim() || null),

    email: z
        .string()
        .email("Email inválido")
        .optional()
        .nullable()
        .transform(v => v?.toLowerCase().trim() || null),

    cnpj_cpf: z
        .string()
        .min(11, "CPF/CNPJ inválido")
        .max(14, "CPF/CNPJ inválido")
        .optional()
        .nullable(),
        
})
.refine(
    data => data.email || data.cnpj_cpf,
    {
        message: "Informe ao menos email ou CPF/CNPJ",
        path: ["email"],
    }
);
