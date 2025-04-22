import Property from "../models/Property.js";

class propertyService {
    // Método para Consultar todas as Propriedades
    async getAll(){
        try{
            const propertys = await Property.find()
            return propertys
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Cria uma nova Propriedade
    async Create(nome, finalidade, endereco, tpManejo, responsavel){
        try{
            const newProperty = new Property({
                nome, finalidade, endereco, tpManejo, responsavel
            })
            await newProperty.save()
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Deletar uma Propriedade
    async Delete(id) {
        try{
            const propriedade = await Property.findByIdAndDelete(id);
            if(!propriedade) {
                console.log(`Nenhuma propriedade com o ID: ${id} foi encontrada.`);
                return;
            }
            console.log(`Propriedade ${propriedade.nome} com o ID: ${id} foi deletada.`);
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Atualizar uma Propriedade
    async Update(
        id, nome, finalidade, endereco, tpManejo, responsavel
    ){
        try{
            const UpdateProperty = await Property.findByIdAndUpdate(id,
                {
                    nome, finalidade, endereco, tpManejo, responsavel
                },
                { new:  true}
            );
            console.log(`Dados da Propriedade: ${nome} do ID: ${id}, foram alterados com sucesso!`)
            return UpdateProperty
        } catch(error) {
            console.log(error);
        }
    }

    // Método para Listar uma Propriedade Especifica
    async getOne(id){
        try{
            const property = await Property.findOne({_id: id})
            return property
        } catch (error) {
            console.log(error)
        }
    }
}

export default new propertyService();