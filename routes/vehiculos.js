import express from 'express'
import mysqlConnection from '../database/db.js';

const router = express.Router();

// obtener los vehiculos

router.get('/vehiculos', (req, res) => {
    mysqlConnection.query('SELECT * FROM vehiculos', (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// obtener vehiculo por id
router.get('/vehiculos/:id_vehiculo', (req, res) => {
    const { id_vehiculo } = req.params;
    mysqlConnection.query('SELECT * FROM vehiculos WHERE id_vehiculo = ?', [id_vehiculo], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// crear vehiculos

router.post('/vehiculos', (req, res) => {
    const { nombre, patente, capacidad } = req.body;
    const newVehiculo = {
        nombre,
        patente,
        capacidad
    };

    const query = 'INSERT INTO vehiculos SET ?';
    mysqlConnection.query(query, newVehiculo, (error, result) => {
        if (error) {
            console.error('Error al registrar vehiculo:', error);
            res.status(500).json({ message: 'Error al registrar vehiculo' });
        } else {
            res.status(201).json({ message: 'Vehiculo registrado correctamente' });
        }
    });
})

// editar un vehiculo

router.put('/vehiculos/:id_vehiculo', (req, res) => {
    const { nombre, patente, capacidad } = req.body;
    const { id_vehiculo } = req.params;
    const updateVehiculo = {
        nombre,
        patente,
        capacidad
    };

    const query = 'UPDATE vehiculos SET ? WHERE id_vehiculo = ?';
    mysqlConnection.query(query, [updateVehiculo, id_vehiculo], (error, result) => {
        if (error) {
            console.error('Error al actualizar vehiculo:', error);
            res.status(500).json({ message: 'Error al actualizar vehiculo' });
        } else {
            res.json({ message: 'Vehiculo actualizado correctamente' });
        }
    });
})

// eliminar vehiculo a

router.delete('/vehiculos/:id_vehiculo', (req, res) => {
    const { id_vehiculo } = req.params;
    mysqlConnection.query('DELETE FROM vehiculos WHERE id_vehiculo = ?', [id_vehiculo], (error, result) => {
        if (error) {
            console.error('Error al eliminar vehiculo:', error);
            res.status(500).json({ message: 'Error al eliminar vehiculo' });
        } else {
            res.json({ message: 'Vehiculo eliminado correctamente' });
        }
    });
})


export default router;