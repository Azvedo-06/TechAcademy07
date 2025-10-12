import DataService from "../services/dataService.js";
import Event from "../models/eventModel.js";
import {
  eventoValido,
  existeEventoNoMesmoDia,
  formatarData,
  validarDataFormato,
} from "../utills/rules.js";

const dataService = new DataService("eventos.json");

export const getAllEvents = async (req, res) => {
  try {
    const eventos = await dataService.readAll();
    return res.json(eventos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const eventos = await dataService.readAll();
    const event = new Event({ ...req.body });

    // regra de negócio: data tem que ser futura
    if (!eventoValido(event)) {
      return res
        .status(400)
        .json({ error: "Evento precisa ter uma data futura!" });
    }

    // regra: não permitir dois eventos no mesmo dia
    if (existeEventoNoMesmoDia(eventos, event)) {
      return res
        .status(400)
        .json({ error: "Já existe um evento cadastrado nessa data!" });
    }

    // Valida a data
    if (!validarDataFormato(event.date)) {
      return res
        .status(400)
        .json({ error: "Data inválida. Use o formato AAAA/MM/DD." });
    }

    const novoEvento = await dataService.create(event);
    return res.status(201).json(novoEvento);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let eventos = await dataService.readAll();

    const index = eventos.findIndex((event) => String(event.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }
    const updatedEvent = { ...eventos[index], ...req.body };

    // regra de negócio: data tem que ser futura
    if (!eventoValido(updatedEvent)) {
      return res
        .status(400)
        .json({ error: "Evento precisa ter uma data futura!" });
    }

    // regra: não permitir dois eventos no mesmo dia
    if (
      existeEventoNoMesmoDia(
        eventos.filter((e) => e.id !== updatedEvent.id),
        updatedEvent
      )
    ) {
      return res
        .status(400)
        .json({ error: "Já existe um evento cadastrado nessa data!" });
    }

     if (updatedEvent.date) {
      const dataObj = new Date(updatedEvent.date);
      updatedEvent.date = formatarData(dataObj);
    }

    // Valida a data
    if (!validarDataFormato(updatedEvent.date)) {
      return res.status(400).json({ error: 'Data inválida. Use o formato AAAA/MM/DD.' });
    }

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
