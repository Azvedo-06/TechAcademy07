import DataService from "../services/dataService.js";
import Event from "../models/eventModel.js";

// Inicialize o serviço de dados com o caminho do arquivo JSON
const dataService = new DataService("eventos.json");

// get all events
export const getAllEvents = async (req, res) => {
  try {
    const eventos = await dataService.readAll();
    return res.json(eventos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create a new event
export const createEvent = async (req, res) => {
  try {
    const eventos = (await dataService.readAll()) || []; // garante array
    const event = new Event(req.body);

    eventos.push(event);
    await dataService.writeAll(eventos);

    return res.status(201).json(event);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
