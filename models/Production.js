import mongoose from "mongoose";

// Documento aninhado
const coletaSchema = new mongoose.Schema({
    dataColeta: Date,
    quantidadeColetada: Number,
    empresaColeta: String,
    valorPago: Number,
    resultado: String,
    desc: String,  
})

// Documento aninhado
const producaoeSchema = new mongoose.Schema({
    quantidadeAdicao: Number,
    dataAtualizacao: Date,
})

// Documento
const productionSchema = new mongoose.Schema({
    totalProduzido: Number,
    totalRejeitado: Number,
    totalRetirado: Number,
    taxaAprovacao: Number,
    taxaRejeicao: Number,
    dataAtualizacao: Date,
    coletas: [coletaSchema],
    producao: [producaoeSchema]
})

const Production = mongoose.model('Production', productionSchema)
export default Production