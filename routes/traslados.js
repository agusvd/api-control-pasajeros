import express from 'express'
import mysqlConnection from '../database/db.js'

const router = express.Router()

// Obtener todos los traslados con sus trabajadores asociados
router.get('/traslados', (req, res) => {
    mysqlConnection.query('SELECT * FROM traslados', (error, traslados) => {
        if (error) {
            console.error('Error al obtener los traslados:', error);
            res.status(500).json({ message: 'Error al obtener los traslados' });
            return;
        }

        // Obtener los trabajadores asociados a cada traslado
        Promise.all(traslados.map(traslado => {
            return new Promise((resolve, reject) => {
                mysqlConnection.query('SELECT id_trabajador FROM trabajadores_por_traslado WHERE id_traslado = ?', [traslado.id_traslado], (error, trabajadores) => {
                    if (error) {
                        console.error('Error al obtener los trabajadores del traslado:', error);
                        reject(error);
                    } else {
                        traslado.trabajadores = trabajadores.map(t => t.id_trabajador);
                        resolve(traslado);
                    }
                });
            });
        })).then(trasladosConTrabajadores => {
            res.json(trasladosConTrabajadores);
        }).catch(error => {
            res.status(500).json({ message: 'Error al obtener los traslados con trabajadores' });
        });
    });
});


// Crear un nuevo traslado
router.post('/traslados', (req, res) => {
    const { fecha, id_conductor, trabajadores, valor_por_persona, tipo_viaje, comentario } = req.body;
    const formattedFecha = new Date(fecha).toISOString().slice(0, 10);

    const newTraslado = {
        fecha: formattedFecha,
        id_conductor,
        valor_por_persona,
        tipo_viaje,
        comentario
    };

    mysqlConnection.query('INSERT INTO traslados SET ?', newTraslado, (error, result) => {
        if (error) {
            console.error('Error al registrar traslado:', error);
            res.status(500).json({ message: 'Error al registrar traslado' });
        } else {
            const id_traslado = result.insertId;
            // Insertar los trabajadores por traslado
            const values = trabajadores.map(id_trabajador => [id_traslado, id_trabajador]);
            mysqlConnection.query('INSERT INTO trabajadores_por_traslado (id_traslado, id_trabajador) VALUES ?', [values], (error, result) => {
                if (error) {
                    console.error('Error al registrar trabajadores por traslado:', error);
                    res.status(500).json({ message: 'Error al registrar trabajadores por traslado' });
                } else {
                    res.status(201).json({ message: 'Traslado registrado correctamente' });
                }
            });
        }
    });
});

// eliminar traslado
router.delete('/traslados/:id_traslado', (req, res) => {
    const { id_traslado } = req.params;
    mysqlConnection.query('DELETE FROM traslados WHERE id_traslado = ?', [id_traslado], (error, result) => {
        if (error) {
            console.error('Error al eliminar traslado:', error);
            res.status(500).json({ message: 'Error al eliminar traslado' });
        } else {
            res.json({ message: 'Traslado eliminado correctamente' });
        }
    });
});





export default router;