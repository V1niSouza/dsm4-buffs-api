import mongoose from "mongoose";

// Documento aninhado
const enderecoSchema = new mongoose.Schema({
    estado: String,
    bairro: String,
    rua: String,
    cidade: String
})

// Documento
const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    userName: String,
    password: String,
    telefone: String,
    dataNascimento: Date,
    cargo: String,
    endereco: [enderecoSchema]
})

const User = mongoose.model('User', userSchema)
export default User