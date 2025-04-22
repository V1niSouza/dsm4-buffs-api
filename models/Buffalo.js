import mongoose from "mongoose";

// Documento Aninhado
const atividadeSchema = new mongoose.Schema({
    status: String, // Ativa, Descartada
    observacao: String, // Motivo
    dataAtualizacao: Date
});

// Documento Aninhado
const zootecnicoSchema = new mongoose.Schema({
    peso: Number,
    condicaoCorporal: String,
    observacao: String,
    dataAtualizacao: Date,
    funcionarioResponsavel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Documento Aninhado
const sanitarioSchema = new mongoose.Schema({
    tpSanitario: String, // Vacinação, Vermifugo, Tratamento
    medicacaoAplicada: String,
    dataAplicacao: Date,
    proximoRetorno: String, // Sim ou Não
    dataRetorno: Date, // Se Sim 
    observacao: String,
    dosagem: Number,
    unidadeMedidaDosagem: String,
    doencaCombatida: String,
    funcionarioResponsavel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

// Documento
const buffaloSchema = new mongoose.Schema({
    tag: String,
    nome: String,
    sexo: String,
    maturidade: String, // Bezerro, Novilha, Vaca
    raca: String,
    tagPai: String,
    tagMae: String,
    localizacao: String, // ID do Lot
    grupo: String, // Lactando, Secagem... (Grupo 1, Grupo 2, ...)
    atividade: [atividadeSchema], // Status do bufalo 
    zootecnico: [zootecnicoSchema],
    sanitario: [sanitarioSchema]
});

const Buffalo = mongoose.model('Buffalo', buffaloSchema)
export default Buffalo