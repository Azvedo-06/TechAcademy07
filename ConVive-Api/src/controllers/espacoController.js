import DataService from "../services/dataService.js";
import Espacos from "../models/espacosModel.js";

const dataService = new DataService("espacos.json");

export const getAllEspacos = async (req, res) => {
    try {
        const espacos = await dataService.readAll();
        return res.json(espacos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createEspaco = async (req, res) => {
    try {
        const espacos = (await dataService.readAll()) || [];
        const espaco = new Espacos(req.body);

        espacos.push(espaco);
        await dataService.writeAll(espacos);

        return res.status(201).json(espaco);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteEspaco = async (req, res) => {
    try {
        const { id } = req.params;
        let espacos = await dataService.readAll();
        const index = espacos.findIndex((espaco) => String(espaco.id) === String(id));

        if (index === -1) {
            return res.status(404).json({ error: "Espaço não encontrado" });
        }
        
        const [deletedEspaco] = espacos.splice(index, 1);
        await dataService.writeAll(espacos);
        return res.json({
            message: "Espaço deletado com sucesso",
            espaco: deletedEspaco,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}