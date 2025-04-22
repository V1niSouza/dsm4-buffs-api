import mongoose from "mongoose";

// Documento 
const reproductionSchema = new mongoose.Schema({
    tagBufala: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Buffalo' }],
    status: String, // Prenha, Cio
    dataStatus: String, // Data que o status foi modificado
    dataInseminacao: Date,
    tipoInseminacao: String, // Artificial, Monta Natural
    vetResponsavel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tagPai: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Buffalo' }]
})

const Reproduction = mongoose.model('Reproduction', reproductionSchema)
export default Reproduction