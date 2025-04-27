import { z } from 'zod';

// Validação de um ObjectId, com Regex
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, {
    message: "ID inválido, precisa ser um ObjectId válido (24 hex chars)"
})

// Schema principal para Cadastro
export const createReproductionSchema = z.object({
    tagBufala: z.string(),
    status: z.enum(['Prenha', 'Cio']),
    dataStatus: z.coerce.date(),
    dataInseminacao: z.coerce.date().optional(),
    tipoInseminacao: z.enum(['Artificial', 'Monta Natural']).optional(),
    vetResponsavel: z.array(objectIdSchema),
    tagPai: z.string()
}).refine((data) => {
    if (data.status === 'Prenha') {
        return data.dataInseminacao && data.tipoInseminacao && data.tagPai?.length > 0;
    }
    return true;
}, {
    message: "Para status 'Prenha', é necessário informar dataInseminacao, tipoInseminacao e tagPai",
    path: ['dataInseminacao'] // pode ser qualquer um dos campos como referência pro erro
});

// Schema principal para Atualização
export const updateReproductionSchema = z.object({
    tagBufala: z.string().optional(),
    status: z.enum(['Prenha', 'Cio']).optional(),
    dataStatus: z.coerce.date().optional(),
    dataInseminacao: z.coerce.date().optional(),
    tipoInseminacao: z.enum(['Artificial', 'Monta Natural']).optional(),
    vetResponsavel: z.array(objectIdSchema).optional(),
    tagPai: z.string().optional()
  }).refine(data => {
    if (data.status === 'Prenha') {
      return !!data.dataInseminacao && !!data.tipoInseminacao && data.tagPai?.length > 0
    }
    return true
  }, {
    message: "Para status 'Prenha', dataInseminacao, tipoInseminacao e tagPai são obrigatórios.",
    path: ['dataInseminacao']
  })