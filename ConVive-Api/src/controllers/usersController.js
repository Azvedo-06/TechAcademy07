import DataService from "../services/dataService.js";
import User from "../models/userModel.js";
import {
  validarNome,
  validarCPF,
  validarTelefone,
} from "../utills/validator.js";

const dataService = new DataService("usuarios.json");

export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await dataService.readAll();
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, cpf, telefone, isAdmin = false } = req.body;
    
    if (!validarNome(name)) {
      return res.status(400).json({ erro: "Nome inválido" });
    }
    if (!validarCPF(cpf)) {
      return res.status(400).json({ erro: "Formato de CPF inválido. Use 00000000000 ou 000.000.000-00"});
    }
    if (!validarTelefone(telefone)) {
      return res.status(400).json({ erro: 'Telefone inválido. Use formato +554499999999 ou (44)99999-9999' });
    }
    
    const usuario = await dataService.create({ name, cpf, telefone, isAdmin });

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let usuarios = await dataService.readAll();

    const index = usuarios.findIndex((user) => String(user.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const [deletedUser] = usuarios.splice(index, 1);

    await dataService.writeAll(usuarios);

    return res.json({
      message: "Usuário deletado com sucesso",
      user: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
