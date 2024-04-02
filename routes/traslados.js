import express from 'express'
import mysqlConnection from '../database/db.js'

const router = express.Router()



// Crear un nuevo traslado
router.post('/traslados', (req, res) => {
    const { fecha, conductor, vehiculo, tipo_viaje, trabajadores, asistencias, comentarios } = req.body;
    const formattedFecha = new Date(fecha).toISOString().slice(0, 10);

    console.log('fecha:', formattedFecha);
    console.log('conductor:', conductor);
    console.log('vehiculo:', vehiculo);
    console.log('tipo_viaje:', tipo_viaje);
    console.log('trabajadores:', trabajadores);
    console.log('asistencias:', asistencias);
    console.log('comentarios:', comentarios);

    var valorPorPersona = 0;
    const personas = trabajadores.length;
    const valorTotalVan = 53000;
    const valorTotalTaxi = 15000;

    if (vehiculo.includes('van')) {
        valorPorPersona = valorTotalVan / personas;
    }
    if (vehiculo.includes('taxi')) { 
        valorPorPersona =  valorTotalTaxi / personas;
    }

    const newTraslado = {
        fecha: formattedFecha,
        nombre_conductor: conductor,
        vehiculo,
        tipo_viaje,
        valor_por_persona: valorPorPersona,
    };

    mysqlConnection.query('INSERT INTO traslados SET ?', newTraslado, (error, result) => {
        if (error) {
            console.error('Error al registrar traslado:', error);
            res.status(500).json({ message: 'Error al registrar traslado' });
        } else {
            const id_traslado = result.insertId;

            const asistenciaYComentarios = trabajadores.map(trabajador => {
                const id_trabajador = trabajador;
                const asistencia = asistencias[id_trabajador];
                const comentario = comentarios[id_trabajador];

                return {
                    id_traslado,
                    id_trabajador,
                    fecha: formattedFecha, // Agregar la fecha aquí
                    asistencia,
                    comentario
                };
            });

            mysqlConnection.query('INSERT INTO asistencia (id_traslado, id_trabajador, fecha, asistencia, comentario) VALUES ?', [asistenciaYComentarios.map(({ id_trabajador, fecha, asistencia, comentario }) => [id_traslado, id_trabajador, fecha, asistencia, comentario])], (error, result) => {
                if (error) {
                    console.error('Error al registrar asistencias y comentarios:', error);
                    res.status(500).json({ message: 'Error al registrar asistencias y comentarios' });
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