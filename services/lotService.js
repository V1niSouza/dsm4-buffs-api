import { createLotSchema, updateLotSchema } from "../dtos/lot.dto.js";
import Lot from "../models/Lot.js";

class lotService {
    // Método para Consultar todos os Lotes
    async getAll(){
        try{
            const lots = await Lot.find()
            return lots
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Cria um novo Lote
    async Create(data){
        try{
            const validatedData = createLotSchema.parse(data);
            const newLot = new Lot(validatedData);          
            await newLot.save();
            return newLot;
        } catch (error) {
            console.log(error)
            throw new Error ("Erro na criação do Lote: " + error.message);
        }
    }

    // Método para Deletar um Lote
    async Delete(id) {
        try{
            const lote = await Lot.findByIdAndDelete(id);
            if(!lote) {
                console.log(`Nenhum lote com o ID: ${id} foi encontrado.`);
                return;
            }
            console.log(`Lote ${lote.nomeLote} com o ID: ${id} foi deletada.`);
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Atualizar um Lote
    async Update(id, data){
        try{
            // Validação dos dados com Zod
            const validatedData = updateLotSchema.parse(data);
            // Realiza a atualização no banco de dados
            const updateLot = await Lot.findByIdAndUpdate(
                id,
                validatedData,
                { new:  true}
            );
            // Verifica se o item foi encontrado
            if (!updateLot){
                console.log(`Dados do Lote: ${nomeLote} do ID: ${id}, foram alterados com sucesso!`)
                return null;
            }
            // Messagem de Sucesso
            console.log(`Dados do Lote ${updateLot.nome} (ID: ${id}) foram alterados com sucesso!`);
            return updateLot;
        } catch(error) {
            console.log(error);
            throw new Error ("Erro na atualiação do Lote: " + error.message);
        }
    }

    // Método para Listar um Lote Especifico
    async getOne(id){
        try{
            const lot = await Lot.findOne({_id: id})
            return lot
        } catch (error) {
            console.log(error)
        }
    }
}

export default new lotService();