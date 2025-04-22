import Lactation from "../models/Lactation.js";

class lactationService {

    // Método para consultar todos as Lactações da API
    async getAll(){
        try{
            const lactations = await Lactation.find();
            return lactations
        } catch (error) {
            console.log(error)
        }
    }

    // Método para criar uma nova Lactação da API
    async Create(tagBufala, status, dataAtualizacao, metrica){
        try{
            const newLactation = new Lactation({
                tagBufala, status, dataAtualizacao: new Date(dataAtualizacao), metrica
            }) 
            await newLactation.save()
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Deletar uma Lactação da API
    async Delete(id) {
        try{
            const lactacao = await Lactation.findByIdAndDelete(id);
            if (!lactacao) {
                console.log(`Nenhuma lactação com o ID: ${id} foi encontrado.`);
                return;
            }
            console.log(`Lactação com o ID: ${id} foi deletado.`);
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Atualizar uma Lactação da API
    async Update(
        id, tagBufala, status, dataAtualizacao, metrica
    ) {
        try{
            // Busca Lactação especificado
            const UpdateLactation = await Lactation.findByIdAndUpdate(id,
                {
                    tagBufala, status, dataAtualizacao, metrica
                }, 
                { new: true}
            );
            console.log(`Dados da Lactação do ID: ${id}, foram alterados com sucesso!`)
            return UpdateLactation
        } catch(error){
            console.log(error);
        }
    }

    //Método para Listar uma Lactação Especifica
    async getOne(id){
        try{
            const lactation = await Lactation.findOne({_id: id})
            return lactation
        } catch (error) {
            console.log(error)
        }
    }
}

export default new lactationService();