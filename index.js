import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import AuthRouter from './routes/auth.js';
import UserRouter from './routes/user.js';
import TrabajadoresRouter from './routes/trabajadores.js';
import VehiculosRouter from './routes/vehiculos.js';
import ViajesRouter from './routes/viajes.js';
import ValoresRouter from './routes/valores.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

// Define las rutas
app.use('/api/auth', AuthRouter); 
app.use('/api/user', UserRouter);
app.use('/api/dashboard', TrabajadoresRouter);
app.use('/api/dashboard', VehiculosRouter);
app.use('/api/chofer', ViajesRouter);
app.use('/api/dashboard', ValoresRouter);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
