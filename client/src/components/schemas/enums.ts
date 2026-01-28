import z from "zod";

export const tecnologia = z.enum(["FOTOVOLTAICA", "BIOGAS", "PCH", "BESS"]);
export const comprador = z.enum(["ACL", "ACR", "AUTOCONSUMO"]);
export const contrato = z.enum(["PPA", "MERCADO LIVRE", "SPOT"]);
