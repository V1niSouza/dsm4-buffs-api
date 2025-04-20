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
    async Create(nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda){
        try{
            const newLot = new Lot({
                nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda
            })
            await newLot.save()
        } catch (error) {
            console.log(error)
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
    async Update(
        id, nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda
    ){
        try{
            const UpdateLote = await Lot.findByIdAndUpdate(id,
                {
                    nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda
                },
                { new:  true}
            );
            console.log(`Dados do Lote: ${nomeLote} do ID: ${id}, foram alterados com sucesso!`)
            return UpdateLote
        } catch(error) {
            console.log(error);
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