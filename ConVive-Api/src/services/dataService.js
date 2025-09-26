import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class DataService {
  constructor(filename) {
    this.dataPath = path.join(__dirname, '../data', filename);
  }

  async readAll() {
    const raw = await fs.readFile(this.dataPath, 'utf8');
    return JSON.parse(raw);
  }

  async writeAll(data) {
    await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2), 'utf8');
  }

  // retorna próximo ID auto-increment
  async getNextId() {
    const data = await this.readAll();
    if (!data.length) return 1;
    const ids = data.map(item => item.id);
    return Math.max(...ids) + 1;
  }

  // cria um novo registro com ID auto-increment
  async create(item) {
    const data = await this.readAll();
    const id = await this.getNextId();
    const newItem = { ...item, id };
    data.push(newItem);
    await this.writeAll(data);
    return newItem;
  }
}