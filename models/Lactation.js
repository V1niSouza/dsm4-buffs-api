import mongoose from "mongoose";

// Documento aninhado
const metricSchema = new mongoose.Schema({
    quantidade: Number,
    unidadeMedida: String,
    dataMedida: Date,
    dataInicio: Date,
    dataFim: Date,
})

// Documento
const lactationSchema = new mongoose.Schema({
    tagBufala:  String,
    status: String,
    dataAtualizacao: Date,
    metrica: [metricSchema]     
})

const Lactation = mongoose.model('Lactation', lactationSchema)
export default Lactation