import mongoose from "mongoose";

// Documento aninhado
const enderecoSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  bairro: { type: String, required: true },
  rua: { type: String, required: true },
  cidade: { type: String, required: true }
});

// Documento
const propertySchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  finalidade: { type: String, enum: ['Reprodução', 'Lactação', 'Corte'], required: true },
  endereco: [enderecoSchema], 
  responsavel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
});

const Property = mongoose.model('Property', propertySchema)
export default Property