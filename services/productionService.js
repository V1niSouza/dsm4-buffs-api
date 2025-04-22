import Production from "../models/Production.js"

class productionService {

  // Método para consultar todas as Produções da API
async getAll(){
    try{
        const productions = await Production.find();
        return productions
    } catch (error) {
        console.log(error)
    }
}

// Método para criar uma nova Produção da API
async Create(totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao, coletas, producao){
    try{
        const newProduction = new Production({
            totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao: new Date(dataAtualizacao), coletas, producao
        }) 
        await newProduction.save()
    } catch (error) {
        console.log(error)
    }
}

// Método para Deletar uma Produção da API
async Delete(id) {
    try{
        const producao = await Production.findByIdAndDelete(id);
        if (!producao) {
            console.log(`Nenhuma Produção com o ID: ${id} foi encontrado.`);
            return;
        }
        console.log(`Produção com o ID: ${id} foi deletado.`);
    } catch (error) {
        console.log(error)
    }
}

// Método para Atualizar uma Produção da API
async Update(
    id, totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao, coletas, producao
) {
    try{
        // Busca o usuário especificado
        const UpdateProduction = await Production.findByIdAndUpdate(id,
            {
                totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao, coletas, producao
            }, 
            { new: true}
        );
        console.log(`Dados da produção do ID: ${id}, foram alterados com sucesso!`)
        return UpdateProduction
    } catch(error){
        console.log(error);
    }
}

//Método para Listar uma Produção Especifico
async getOne(id){
    try{
        const production = await Production.findOne({_id: id})
        return production
    } catch (error) {
        console.log(error)
    }
}
}

export default new productionService();