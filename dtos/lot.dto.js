import { z } from 'zod';

// Validação de um ObjectId, com Regex
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, {
    message: "ID inválido, precisa ser um ObjectId válido (24 hex chars)"
})

// Schema principal para Cadastro
export const createLotSchema = z.object({
    nomeLote: z.string(),
    tamanhoArea: z.number(),
    unidadeMedida: z.string(),
    qtdComporta: z.number().optional(),
    status: z.string(), // Ativo, Manutenção
    fazenda: objectIdSchema
});

// Schema principal para Atualização
export const updateLotSchema = z.object({
    nomeLote: z.string().optional(),
    tamanhoArea: z.number().optional(),
    unidadeMedida: z.string().optional(),
    qtdComporta: z.number().optional(),
    status: z.string().optional(), // Ativo, Manutenção
    fazenda: objectIdSchema
});