import dotoenv from 'dotenv';
dotoenv.config()
import cors from 'cors';
import express from 'express';
import eventsRouter from './routes/eventsRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import informativosRouter from './routes/informativosRoutes.js';
import espacosRouter from './routes/espacosRoutes.js';
import atividadesRouter from './routes/atividadesRoutes.js';

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());

// Rotas 
app.get('/', (req, res) => res.json({success: true, message: 'API ConVive OK'}));
app.use('/eventos', eventsRouter);
app.use('/usuarios', usersRouter);
app.use('/informativos', informativosRouter);
app.use('/espacos', espacosRouter); 
app.use('/atividades', atividadesRouter);

app.use((req, res) => res.status(404).json({ success: false, message: 'Rota não encontrada' }));

const PORT = process.env.PORT || 3333;
app.listen(PORT, '0.0.0.0', () => console.log(`API ConVive executando na porta ${PORT}`));