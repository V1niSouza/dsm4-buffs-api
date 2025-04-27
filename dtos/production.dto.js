import { z } from 'zod';

// Subschema (aninhado)
const coletaSchema = z.object({
    dataColeta: z.coerce.date(),
    quantidadeColetada: z.number(),
    empresaColeta: z.string(),
    valorPago: z.number(),
    resultado: z.string(),
    desc: z.string().optional(),  
})

// Subschema (aninhado)
const producaoeSchema = z.object({
    quantidadeAdicao: z.number(),
    dataAtualizacao: z.coerce.date(),
})

// Schema principal para Cadastro
export const createProductionSchema = z.object({
    totalProduzido: z.number(),
    totalRejeitado: z.number(),
    totalRetirado: z.number(),
    taxaAprovacao: z.number().min(0).max(100),
    taxaRejeicao: z.number().min(0).max(100),
    dataAtualizacao: z.coerce.date(),
    coletas: z.array(coletaSchema).optional(),
    producao: z.array(producaoeSchema).optional()
})

// Schema principal para Atualização
export const updateProductionSchema = z.object({
    totalProduzido: z.number().optional(),
    totalRejeitado: z.number().optional(),
    totalRetirado: z.number().optional(),
    taxaAprovacao: z.number().min(0).max(100),
    taxaRejeicao: z.number().min(0).max(100),
    dataAtualizacao: z.coerce.date().optional(),
    coletas: z.array(coletaSchema).optional(),
    producao: z.array(producaoeSchema).optional()
})