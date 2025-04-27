import { createPropertySchema, updatePropertySchema } from "../dtos/property.dto.js";
import Property from "../models/Property.js";

class propertyService {
  // Método para Consultar todas as Propriedades
  async getAll() {
    try {
      const propertys = await Property.find();
      return propertys;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Cria uma nova Propriedade
  async Create(data) {
    try {
      const validatedData = createPropertySchema.parse(data);
      const newProperty = new Property(validatedData);
      await newProperty.save();
      return newProperty;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na criação do búfalo: " + error.message);
    }
  }

  // Método para Deletar uma Propriedade
  async Delete(id) {
    try {
      const propriedade = await Property.findByIdAndDelete(id);
      if (!propriedade) {
        console.log(`Nenhuma propriedade com o ID: ${id} foi encontrada.`);
        return;
      }
      console.log(
        `Propriedade ${propriedade.nome} com o ID: ${id} foi deletada.`
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Atualizar uma Propriedade
  async Update(id, data) {
    try {
        // Validação dos dados com Zod
        const validatedData = updatePropertySchema.parse(data);
        // Realiza a atualização no banco de dados
        const updateProperty = await Property.findByIdAndUpdate(
        id,
        validatedData,
        { new: true } 
      );
      // Verifica se o item foi encontrado
      if (!updateProperty) {
        console.log(`Nenhuma Propriedade com o ID: ${id}, foi encontrado para alteração.`);
        return null;
      }
      // Mensagem de sucesso
      console.log(`Dados da Propriedade ${updateProperty.nome} (ID: ${id}) foram atualizados com sucesso!`);
      return updateProperty; 
    } catch (error) {
      console.log(error);
      throw new Error("Erro na atualização da alimentação: " + error.message); // Retorna o erro se falhar na atualização
    }
  }

  // Método para Listar uma Propriedade Especifica
  async getOne(id) {
    try {
      const property = await Property.findOne({ _id: id });
      return property;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new propertyService();
