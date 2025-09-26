import DataService from "../services/dataService.js";
import Atividade from "../models/atividadeModel.js";

const dataService = new DataService("atividades.json");

export const getAllAtividades = async (req, res) => {
    try {
        const atividades = await dataService.readAll();
        return res.json(atividades);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createAtividade = async (req, res) => {
  try {
        const atividades = (await dataService.readAll()) || [];
        const atividade = new Atividade(req.body);
        
        atividades.push(atividade);
        
        await dataService.writeAll(atividades);
        return res.status(201).json(atividade);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        let atividades = await dataService.readAll();
        const index = atividades.findIndex((atividade) => String(atividade.id) === String(id));
        
        if (index === -1) {
            return res.status(404).json({ error: "Atividade não encontrada" });
        }

        const [deletedAtividade] = atividades.splice(index, 1);
        await dataService.writeAll(atividades);
        
        return res.json({
            message: "Atividade deletada com sucesso",
            atividade: deletedAtividade,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};