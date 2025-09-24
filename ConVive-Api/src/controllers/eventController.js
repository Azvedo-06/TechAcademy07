import DataService from '../services/dataService.js';
import Event from '../models/eventModel.js';

// Inicialize o serviço de dados com o caminho do arquivo JSON
const dataService = new DataService('eventos.json');

// get all events
export const getAllEvents = async (req, res) => {
  const eventos = await dataService.readAll();
  return res.json(eventos);
};