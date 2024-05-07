import express from 'express'
import sql from '../database/db.js';

const router = express.Router();

// obtener a los trabajador que viaja_ida === "si" y estado === "activo"
router.get('/viaje_ida', (req, res) => {
    sql.query('SELECT * FROM trabajadores WHERE viaja_ida = "si" AND estado = "activo"', (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// obtener a los trabajador que viaja_vuelta === "si" y estado === "activo"
router.get('/viaje_vuelta', (req, res) => {
    sql.query('SELECT * FROM trabajadores WHERE viaja_vuelta = "si" AND estado = "activo"', (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

export default router;