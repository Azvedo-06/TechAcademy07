import DataService from "../services/dataService.js";
import Event from "../models/eventModel.js";

// Inicialize o serviço de dados com o caminho do arquivo JSON
const dataService = new DataService("eventos.json");

// crud completa de eventos (create, read, update, delete)
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

// delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let evento = await dataService.readAll();

    const index = evento.findIndex((user) => String(user.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    const [deleteEvent] = evento.splice(index, 1);

    await dataService.writeAll(evento);

    return res.json({
      message: "Evento deletado com sucesso",
      evento: deleteEvent,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let eventos = await dataService.readAll();

    // encontra o evento pelo id
    const index = eventos.findIndex((event) => String(event.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    const updatedEvent = { ...eventos[index], ...req.body };

    // substitui no array
    eventos[index] = updatedEvent;

    await dataService.writeAll(eventos);

    return res.json({
      message: "Evento atualizado com sucesso",
      event: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
