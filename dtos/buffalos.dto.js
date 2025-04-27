import { z } from 'zod';

// Validação de um ObjectId, com Regex
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, {
    message: "ID inválido, precisa ser um ObjectId válido (24 hex chars)"
})

// Subschema (aninhado)
const atividadeSchema = z.object({
    status: z.string(), // Ativa, Descartada
    observacao: z.string().optional(), // Motivo
    dataAtualizacao: z.coerce.date()
})

// Subschema (aninhado)
const zootecnicoSchema = z.object({
    peso: z.number(),
    condicaoCorporal: z.string(),
    observacao: z.string().optional(),
    dataAtualizacao: z.coerce.date(),
    funcionarioResponsavel: z.array(objectIdSchema)
});

// Subschema (aninhado)
const sanitarioSchema = z.object({
    tpSanitario: z.string(),
    medicacaoAplicada: z.string(),
    dataAplicacao: z.coerce.date(),
    proximoRetorno: z.enum(['Sim', 'Não']),
    dataRetorno: z.coerce.date().optional(),
    observacao: z.string().optional(),
    dosagem: z.number(),
    unidadeMedidaDosagem: z.string(),
    doencaCombatida: z.string(),
    funcionarioResponsavel: z.array(objectIdSchema)
});

// Schema principal para Cadastro
export const createBuffaloSchema = z.object({
    tag: z.string(),
    nome: z.string().optional(),
    sexo: z.enum(['Macho', 'Femea']),
    maturidade: z.enum(['Bezerro', 'Novilha', 'Vaca', 'Touro']),
    raca: z.string(),
    tagPai: z.string(),
    tagMae: z.string(),
    localizacao: z.string(),
    grupo: z.string(),
    atividade: z.array(atividadeSchema).optional(),
    zootecnico: z.array(zootecnicoSchema).optional(),
    sanitario: z.array(sanitarioSchema).optional()
});

// Schema principal para Atualização
export const updateBuffaloSchema = z.object({
    tag: z.string(),
    nome: z.string().optional(),
    sexo: z.enum(['Macho', 'Femea']),
    maturidade: z.enum(['Bezerro', 'Novilha', 'Vaca', 'Touro']).optional(),
    raca: z.string().optional(),
    tagPai: z.string().optional(),
    tagMae: z.string().optional(),
    localizacao: z.string().optional(),
    grupo: z.string().optional(),
    atividade: z.array(atividadeSchema).optional(),
    zootecnico: z.array(zootecnicoSchema).optional(),
    sanitario: z.array(sanitarioSchema).optional()
});