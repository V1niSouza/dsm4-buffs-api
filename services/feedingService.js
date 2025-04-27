import Feeding from "../models/Feeding.js"
import { createFeedingSchema, updateFeedingSchema } from "../dtos/feeding.dto.js"

class feedingService {
    // Método para Consultar todas as Alimentações
    async getAll(){
        try{
            const feedings = await Feeding.find()
            return feedings
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Cria uma nova Alimentação
    async Create(data){
        try{
            const validatedData = createFeedingSchema.parse(data);
            const newFeeding = new Feeding(validatedData);  
            await newFeeding.save()
            return newFeeding;
        } catch (error) {
            console.log(error);
            throw new Error("Erro na criação da alimentação: " + error.message);
        }
    }

    // Método para Deletar uma Alimentação
    async Delete(id) {
        try{
            const alimentacao = await Feeding.findByIdAndDelete(id);
            if(!alimentacao) {
                console.log(`Nenhuma propriedade com o ID: ${id} foi encontrada.`);
                return;
            }
            console.log(`Propriedade ${alimentacao.nome} com o ID: ${id} foi deletada.`);
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Atualizar uma Alimentação
    async Update(id, data) {
        try {
          // Validação dos dados com Zod
          const validatedData = updateFeedingSchema.parse(data);
          // Realiza a atualização no banco de dados
          const updateFeeding = await Feeding.findByIdAndUpdate(
            id,
            validatedData,
            { new: true } 
          );
          // Verifica se o item foi encontrado
          if (!updateFeeding) {
            console.log(`Nenhuma alimentação com o ID: ${id} foi encontrado para atualização.`);
            return null;
          }
          // Mensagem de sucesso
          console.log(`Dados da Alimentação ${updateFeeding.nome} (ID: ${id}) foram atualizados com sucesso!`);
          return updateFeeding; 
        } catch (error) {
          console.log(error);
          throw new Error("Erro na atualização da alimentação: " + error.message); // Retorna o erro se falhar na atualização
        }
    }
    
    // Método para Listar uma Alimentação Especifica
    async getOne(id){
        try{
            const feeding = await Feeding.findOne({_id: id})
            return feeding
        } catch (error) {
            console.log(error)
        }
    }
}

export default new feedingService();