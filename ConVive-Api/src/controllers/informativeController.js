import DataService from "../services/dataService.js";
import Informativo from "../models/informativeModel.js";

const dataService = new DataService("informativos.json");

export const getAllInformative = async (req, res) => {
  try {
    const informativos = await dataService.readAll();
    return res.json(informativos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createInformative = async (req, res) => {
  try {
    const informativo = new Informativo({id:null, ...req.body});

    const novoInformativo = await dataService.create(informativo);

    return res.status(201).json(novoInformativo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteInformative = async (req, res) => {
  try {
    const { id } = req.params;
    let informativos = await dataService.readAll();

    const index = informativos.findIndex(
      (inf) => String(inf.id) === String(id)
    );

    if (index === -1) {
      return res.status(404).json({ error: "Informativo não encontrado" });
    }

    const [deletedInformativo] = informativos.splice(index, 1);
    
    await dataService.writeAll(informativos);
    return res.json({
      message: "Informativo deletado com sucesso",
      informativo: deletedInformativo,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
