import mongoose from "mongoose";
import { string } from "zod";

// Documento 
const reproductionSchema = new mongoose.Schema({
    tagBufala: String,
    status: String, // Prenha, Cio
    dataStatus: Date, // Data que o status foi modificado
    dataInseminacao: Date,
    tipoInseminacao: String, // Artificial, Monta Natural
    vetResponsavel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tagPai: String
})

const Reproduction = mongoose.model('Reproduction', reproductionSchema)
export default Reproduction