import DataService from "../services/dataService.js";
import User from "../models/userModel.js";

const dataService = new DataService("usuarios.json");

export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await dataService.readAll();
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export const createUser = async (req, res) => {
  try {
    const usuarios = (await dataService.readAll()) || []; // garante array
    const user = new User(req.body);

    usuarios.push(user);
    await dataService.writeAll(usuarios);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
