import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI); 
const connection = mongoose.connection;

connection.on("error", () => {
  console.log("❌ Erro ao conectar com o MongoDB local");
});

connection.once("open", () => {
  console.log("✅ Conectado ao MongoDB local com sucesso!");
});

export default mongoose;
