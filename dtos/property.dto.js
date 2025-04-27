import { z } from 'zod';

// Validação de um ObjectId, com Regex
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, {
    message: "ID inválido, precisa ser um ObjectId válido (24 hex chars)"
})

// Subschema (aninhado)
const enderecoSchema = z.object({
    estado: z.string(),
    bairro: z.string(),
    rua: z.string(),
    cidade: z.string()
});
  
// Schema principal para Cadastro
export const createPropertySchema = z.object({
    nome:z.string(),
    finalidade: z.enum(['Lactação', 'Corte', 'Reprodução']),
    tpManejo: z.enum(['Rotação de Piquete', 'Estabulo']), // Pastos (piquete) ou concentração 
    endereco: z.array(enderecoSchema).optional(), 
    responsavel: z.array(objectIdSchema)
});

// Schema principal para Atualização
export const updatePropertySchema = z.object({
    nome:z.string().optional(),
    finalidade: z.enum(['Lactação', 'Corte', 'Reprodução']).optional(),
    tpManejo: z.enum(['Rotação de Piquete', 'Estabulo']).optional(), // Pastos (piquete) ou concentração 
    endereco: z.array(enderecoSchema).optional(), 
    responsavel: z.array(objectIdSchema).optional()
});