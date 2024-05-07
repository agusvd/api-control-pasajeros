import express from 'express'
import sql from '../database/db.js';

const router = express.Router();

// obtener los trabajadores
router.get('/trabajadores', (req, res) => {
    sql.query('SELECT * FROM trabajadores', (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})



// crear trabajadores
router.post('/trabajadores', (req, res) => {
    const { nombre_completo, direccion, telefono, transporte, tipo_empresa, estado, viaja_ida, viaja_vuelta } = req.body;
    const newTrabajador = {
        nombre_completo,
        direccion,
        telefono,
        transporte,
        tipo_empresa,
        estado,
        viaja_ida,
        viaja_vuelta
    };

    const query = 'INSERT INTO trabajadores SET ?';
    sql.query(query, newTrabajador, (error, result) => {
        if (error) {
            console.error('Error al registrar trabajador:', error);
            res.status(500).json({ message: 'Error al registrar trabajador' });
        } else {
            res.status(201).json({ message: 'Trabajador registrado correctamente' });
        }
    });
})

// obtener trabajador por id
router.get('/trabajadores/:id_trabajador', (req, res) => {
    const { id_trabajador } = req.params;
    sql.query('SELECT * FROM trabajadores WHERE id_trabajador = ?', [id_trabajador], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// actualizar trabajador

router.put('/trabajadores/:id_trabajador', (req, res) => {
    const { nombre_completo, direccion, telefono, transporte, tipo_empresa, estado, viaja_ida, viaja_vuelta } = req.body;
    const { id_trabajador } = req.params;
    const updateTrabajador = {
        nombre_completo,
        direccion,
        telefono,
        transporte,
        tipo_empresa,
        estado,
        viaja_ida,
        viaja_vuelta
    };

    const query = 'UPDATE trabajadores SET ? WHERE id_trabajador = ?';
    sql.query(query, [updateTrabajador, id_trabajador], (error, result) => {
        if (error) {
            console.error('Error al actualizar trabajador:', error);
            res.status(500).json({ message: 'Error al actualizar trabajador' });
        } else {
            res.json({ message: 'Trabajador actualizado correctamente' });
        }
    });
})

// eliminar trabajador
router.delete('/trabajadores/:id_trabajador', (req, res) => {
    const { id_trabajador } = req.params;
    sql.query('DELETE FROM trabajadores WHERE id_trabajador = ?', [id_trabajador], (error, rows) => {
        if (!error) {
            res.json({ message: 'Trabajador eliminado correctamente' });
        } else {
            console.log(error);
        }
    });
})

export default router;