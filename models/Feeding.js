import mongoose from "mongoose";

// Documento
const feedingSchema = new mongoose.Schema({
    nome: String,
    tpAlimentacao: String,
    quantidade: Number,
    unidadeMedida: String,
    grupoDestinado: String,  // Lactando, Secagem... (Grupo 1, Grupo 2, ...)
    frequencia: Number, // Quantidade por dia
    desc: String // Descrever o motivo desta alimentação
})

const Feeding = mongoose.model('Feeding', feedingSchema)
export default Feeding