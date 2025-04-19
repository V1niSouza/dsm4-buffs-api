import mongoose from "mongoose";

// Documento aninhado
const enderecoSchema = new mongoose.Schema({
  estado: String,
  bairro: String,
  rua: String,
  cidade: String
});

// Documento
const propertySchema = new mongoose.Schema({
  nome:String,
  finalidade: String,
  endereco: [enderecoSchema], 
  responsavel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Property = mongoose.model('Property', propertySchema)
export default Property