import DataService from "../services/dataService.js";
import Atividade from "../models/activitiesModel.js";

const dataService = new DataService("atividades.json");

export const getAllActivities = async (req, res) => {
    try {
        const atividades = await dataService.readAll();
        return res.json(atividades);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createActivities = async (req, res) => {
  try {
        const atividade = new Atividade({id:null, ...req.body});
        const novaAtividade = await dataService.create(atividade);
        
        return res.status(201).json(novaAtividade);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteActivities = async (req, res) => {
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

export const updateActivities = async (req, res) => {
  try {
    const { id } = req.params;
    let atividades = await dataService.readAll();

    const index = atividades.findIndex((atividade) => String(atividade.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: "Atividade não encontrado" });
    }
    const updatedActivitie = { ...atividades[index], ...req.body };
    
    // regra de negócio...

    atividades[index] = updatedActivitie;

    await dataService.writeAll(atividades);

    return res.json({
      message: "Atividade atualizado com sucesso",
      atividades: updatedActivitie,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};