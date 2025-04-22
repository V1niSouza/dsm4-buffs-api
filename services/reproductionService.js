import Rerpoduction from "../models/Reproduction.js";

class reproductionService{
   // Método para Consultar todas as Reproduções
    async getAll(){
        try{
            const reproductions = await Rerpoduction.find()
            return reproductions
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Cria uma nova Reprodução
    async Create(tagBufala, status, dataStatus, dataInseminacao, tipoInseminacao, vetResponsavel, tagPai){
        try{
            const newRerpoduction = new Rerpoduction({
                tagBufala, status, dataStatus, dataInseminacao, tipoInseminacao, vetResponsavel, tagPai
            })
            await newRerpoduction.save()
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Deletar uma Reprodução
    async Delete(id) {
        try{
            const reproducao = await Rerpoduction.findByIdAndDelete(id);
            if(!reproducao) {
                console.log(`Nenhuma reprodução com o ID: ${id} foi encontrada.`);
                return;
            }
            console.log(`Reprodução com o ID: ${id} foi deletada.`);
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Atualizar uma Reprodução
    async Update(
        id, tagBufala, status, dataStatus, dataInseminacao, tipoInseminacao, vetResponsavel, tagPai
    ){
        try{
            const UpdateRerpoduction = await Rerpoduction.findByIdAndUpdate(id,
                {
                    tagBufala, status, dataStatus, dataInseminacao, tipoInseminacao, vetResponsavel, tagPai
                },
                { new:  true}
            );
            console.log(`Dados da reprodução do ID: ${id}, foram alterados com sucesso!`)
            return UpdateRerpoduction
        } catch(error) {
            console.log(error);
        }
    }

    // Método para Listar uma Reprodução Especifica
    async getOne(id){
        try{
            const reproduction = await Rerpoduction.findOne({_id: id})
            return reproduction
        } catch (error) {
            console.log(error)
        }
    }
}

export default new reproductionService();