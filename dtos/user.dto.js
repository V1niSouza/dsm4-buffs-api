import { z } from 'zod';

// Subschema (aninhado)
const enderecoSchema = z.object({
    estado: z.string(),
    bairro: z.string(),
    rua: z.string(),
    cidade: z.string()
})

// Schema principal para Cadastro
export const createUserSchema = z.object({
    nome: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    telefone: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
        message: "Telefone inválido. Use o formato (XX) XXXXX-XXXX"
      }),
    dataNascimento: z.coerce.date().refine(date => {
        const now = new Date()
        return date < now
      }, {
        message: "Data de nascimento deve ser no passado"
      }),
    cargo: z.string(),
    endereco: z.array(enderecoSchema).optional()
})

// Schema principal para Atualização
export const updateUserSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  telefone: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
      message: "Telefone inválido. Use o formato (XX) XXXXX-XXXX"
    }).optional(),
  dataNascimento: z.coerce.date().refine(date => {
      const now = new Date()
      return date < now
    }, {
      message: "Data de nascimento deve ser no passado"
    }).optional(),
  cargo: z.string().optional(),
  endereco: z.array(enderecoSchema).optional()
})