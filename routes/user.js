import express from 'express'
import mysqlConnection from '../database/db.js';


const router = express.Router();

// obtener usuario administrador
router.get('/users/admin', (req, res) => {
    mysqlConnection.query('SELECT * FROM admin', (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// obtener admin por id
router.get('/users/admin/:id_admin', (req, res) => {
    const { id_admin } = req.params;
    mysqlConnection.query('SELECT * FROM admin WHERE id_admin = ?', [id_admin], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// obtener usuario conductor 
router.get('/users/conductor', (req, res) => {
    mysqlConnection.query('SELECT * FROM conductores', (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// obtener conductor por id
router.get('/users/conductor/:id_conductor', (req, res) => {
    const { id_conductor } = req.params;
    mysqlConnection.query('SELECT * FROM conductores WHERE id_conductor = ?', [id_conductor], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
})

// eliminar conductor
router.delete('/users/chofer/:id_conductor', (req, res) => {
    const { id_conductor } = req.params;
    mysqlConnection.query('DELETE FROM conductores WHERE id_conductor = ?', [id_conductor], (error, rows) => {
        if (!error) {
            res.json({ message: 'Conductor eliminado correctamente' });
        } else {
            console.log(error);
        }
    });
})


export default router;