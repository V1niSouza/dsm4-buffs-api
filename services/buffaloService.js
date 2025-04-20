import Buffalo from "../models/Buffalo.js"

class buffaloService {
    // Método para Consultar todos os Bufalos
    async getAll(){
        try{
            const buffalos = await Buffalo.find()
            return buffalos
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Cria um novo Bufalo
    async Create(tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario){
        try{
            const newBuffalo = new Buffalo({
                tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario
            })
            await newBuffalo.save()
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Deletar um Bufalo
    async Delete(id) {
        try{
            const bufalo = await Buffalo.findByIdAndDelete(id);
            if(!bufalo) {
                console.log(`Nenhum Bufalo com o ID: ${id} foi encontrada.`);
                return;
            }
            console.log(`Bufalo ${bufalo.nome} com o ID: ${id} foi deletada.`);
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Atualizar um Bufalo
    async Update(
        id, tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario
    ){
        try{
            const UpdateBuffalo = await Buffalo.findByIdAndUpdate(id,
                {
                    tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario
                },
                { new:  true}
            );
            console.log(`Dados do Bufalo: ${nome} do ID: ${id}, foram alterados com sucesso!`)
            return UpdateBuffalo
        } catch(error) {
            console.log(error);
        }
    }

    // Método para Listar uma Bufalo Especifica
    async getOne(id){
        try{
            const buffalo = await Buffalo.findOne({_id: id})
            return buffalo
        } catch (error) {
            console.log(error)
        }
    }
}

export default new buffaloService();