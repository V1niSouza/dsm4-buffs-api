import { z } from 'zod';

// Schema principal para Cadastro
export const createFeedingSchema = z.object({
    nome: z.string(),
    tpAlimentacao: z.string(),
    quantidade: z.number(),
    unidadeMedida: z.string(),
    grupoDestinado: z.enum(['Em lactação', 'Secagem', 'Seca', 'Pré-parto', 'Bezerros']).optional(),
    frequencia: z.number().optional(), // Quantidade por dia
    desc: z.string().optional() // Descrever o motivo desta alimentação
})

// Schema principal para Atualização
export const updateFeedingSchema = z.object({
    nome: z.string().optional(),
    tpAlimentacao: z.string().optional(),
    quantidade: z.number().optional(),
    unidadeMedida: z.string().optional(),
    grupoDestinado: z.enum(['Em lactação', 'Secagem', 'Seca', 'Pré-parto', 'Bezerros']).optional(),
    frequencia: z.number().optional(), // Quantidade por dia
    desc: z.string().optional() // Descrever o motivo desta alimentação
})