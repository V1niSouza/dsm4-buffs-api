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
    dataAtualizacao: z.coerce.date(),
    coletas: z.array(coletaSchema).optional(),
    producao: z.array(producaoeSchema).optional()
})

// Schema principal para Atualização
export const updateProductionSchema = z.object({
    dataAtualizacao: z.coerce.date().optional(),
    coletas: z.array(coletaSchema).optional(),
    producao: z.array(producaoeSchema).optional()
})