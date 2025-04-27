import { z } from 'zod';


// Subschema (aninhado)
const metricSchema = z.object({
    quantidade: z.number(),
    unidadeMedida: z.string(),
    dataMedida: z.coerce.date(),
    dataInicio: z.coerce.date(),
    dataFim: z.coerce.date().optional(),
})

// Schema principal para Cadastro
export const createLactationSchema = z.object({
    tagBufala:  z.string(),
    status: z.string(),
    dataAtualizacao: z.coerce.date(),
    metrica: z.array(metricSchema).optional()     
})

// Schema principal para Atualização
export const updateLactationSchema = z.object({
    tagBufala: z.string(),
    status: z.string().optional(),
    dataAtualizacao: z.coerce.date().optional(),
    metrica: z.array(metricSchema).optional()     
})