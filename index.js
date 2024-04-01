import express from 'express'
const app = express();
const PORT = process.env.PORT || 3000;
import cookieParser from 'cookie-parser';
import cors from 'cors'
import morgan from 'morgan'

app.use(morgan('dev'));

import AuthRouter from './routes/auth.js'
import UserRouter from './routes/user.js'
import TrabajadoresRouter from './routes/trabajadores.js'
import VehiculosRouter from './routes/vehiculos.js'

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

// Define las rutas
app.use('/api/auth', AuthRouter); 
app.use('/api/user', UserRouter);
app.use('/api/dashboard', TrabajadoresRouter);
app.use('/api/dashboard', VehiculosRouter);



app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
