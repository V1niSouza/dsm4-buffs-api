import User from "../models/Users.js";

class userService {

    // Método para consultar todos os Usuários da API
    async getAll(){
        try{
            const users = await User.find();
            return users
        } catch (error) {
            console.log(error)
        }
    }

    // Método para criar um novo Usuários da API
    async Create(nome, email, telefone, dataNascimento, cargo, endereco){
        try{
            const newUser = new User({
                nome, email, telefone, dataNascimento: new Date(dataNascimento), cargo, endereco
            }) 
            await newUser.save()
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Deletar um Usuário da API
    async Delete(id) {
        try{
            const usuario = await User.findByIdAndDelete(id);
            if (!usuario) {
                console.log(`Nenhum usuário com o ID: ${id} foi encontrado.`);
                return;
            }
            console.log(`Usuário ${usuario.nome} com o ID: ${id} foi deletado.`);
        } catch (error) {
            console.log(error)
        }
    }

    // Método para Atualizar um Usuário da API
    async Update(
        id, nome, email, telefone, dataNascimento, cargo, endereco
    ) {
        try{
            // Busca o usuário especificado
            const UpdateUser = await User.findByIdAndUpdate(id,
                {
                    nome, email, telefone, dataNascimento, cargo, endereco
                }, 
                { new: true}
            );
            console.log(`Dados do Usuário: ${nome} do ID: ${id}, foram alterados com sucesso!`)
            return UpdateUser
        } catch(error){
            console.log(error);
        }
    }

    //Método para Listar um Usuário Especifico
    async getOne(id){
        try{
            const user = await User.findOne({_id: id})
            return user
        } catch (error) {
            console.log(error)
        }
    }
}

export default new userService();