import Feeding from "../models/Feeding.js"

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
    async Create(nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc){
        try{
            const newFeeding = new Feeding({
                nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc
            })
            await newFeeding.save()
        } catch (error) {
            console.log(error)
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
    async Update(
        id, nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc
    ){
        try{
            const UpdateFeeding = await Feeding.findByIdAndUpdate(id,
                {
                    nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc
                },
                { new:  true}
            );
            console.log(`Dados da Propriedade: ${nome} do ID: ${id}, foram alterados com sucesso!`)
            return UpdateProperty
        } catch(error) {
            console.log(error);
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