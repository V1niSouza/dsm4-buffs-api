import mongoose from "mongoose";

// Documento
const lotSchema = new mongoose.Schema({
  nomeLote: String,
  tamanhoArea: Number,
  unidadeMedida: String,
  qtdComporta: Number,
  status: String, // Ativo, Manutenção
  fazenda: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

const Lot = mongoose.model('Lot', lotSchema)
export default Lot