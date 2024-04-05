import express from 'express'
import mysqlConnection from '../database/db.js'

const router = express.Router()

// Obtener todos los traslados con sus asistencias y comentarios
router.get('/traslados', (req, res) => {
    mysqlConnection.query('SELECT * FROM traslados', (error, traslados) => {
        if (error) {
            console.error('Error al obtener traslados:', error);
            res.status(500).json({ message: 'Error al obtener traslados' });
        } else {
            const trasladosPromises = traslados.map(traslado => {
                return new Promise((resolve, reject) => {
                    mysqlConnection.query('SELECT * FROM asistencia WHERE id_traslado = ?', [traslado.id_traslado], (error, asistencias) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({ ...traslado, asistencias });
                        }
                    });
                });
            });

            Promise.all(trasladosPromises).then(traslados => {
                res.json(traslados);
            }).catch(error => {
                console.error('Error al obtener asistencias:', error);
                res.status(500).json({ message: 'Error al obtener asistencias' });
            });
        }
    });
});

// Obtener la asistencia por fecha, nombre de persona y tipo de destino
router.get('/asistencia', (req, res) => {
    const { fecha, nombre, tipoDestino } = req.query;
    let query = `
        SELECT a.*, t.nombre_completo 
        FROM asistencia a 
        JOIN trabajadores t ON a.id_trabajador = t.id_trabajador 
        JOIN traslados tr ON a.id_traslado = tr.id_traslado 
        WHERE 1`;

    const params = [];

    if (fecha) {
        query += ' AND a.fecha = ?';
        params.push(fecha);
    }

    if (nombre) {
        query += ' AND t.nombre_completo LIKE ?';
        params.push(`%${nombre}%`);
    }

    if (tipoDestino) {
        query += ' AND tr.tipo_viaje LIKE ?';
        params.push(`%${tipoDestino}%`);
    }

    mysqlConnection.query(query, params, (error, asistencia) => {
        if (error) {
            console.error('Error al obtener asistencia:', error);
            res.status(500).json({ message: 'Error al obtener asistencia' });
        } else {
            res.json(asistencia);
        }
    });
});

// Obtener la asistencia del día de hoy con los nombres completos de los trabajadores
router.get('/asistencia-hoy', (req, res) => {
    const fechaActual = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD

    // Consulta para obtener la asistencia de ida del día de hoy con los nombres completos de los trabajadores
    const queryIda = `
        SELECT t.*, a.*, c.nombre_completo AS nombre_conductor, c.telefono AS telefono_conductor, v.nombre AS vehiculo_nombre, v.patente AS vehiculo_patente, v.capacidad AS vehiculo_capacidad, trabajadores.nombre_completo AS nombre_trabajador
        FROM traslados t 
        JOIN asistencia a ON t.id_traslado = a.id_traslado 
        JOIN trabajadores ON a.id_trabajador = trabajadores.id_trabajador
        JOIN conductores c ON t.nombre_conductor = c.nombre_completo
        JOIN vehiculos v ON c.id_vehiculo = v.id_vehiculo
        WHERE t.tipo_viaje = 'ida' AND DATE(t.fecha) = ?`;

    mysqlConnection.query(queryIda, [fechaActual], (errorIda, trasladosIda) => {
        if (errorIda) {
            console.error('Error al obtener traslados de ida:', errorIda);
            res.status(500).json({ message: 'Error al obtener traslados de ida' });
        } else {
            // Consulta para obtener la asistencia de vuelta del día de hoy con los nombres completos de los trabajadores
            const queryVuelta = `
                SELECT t.*, a.*, c.nombre_completo AS nombre_conductor, c.telefono AS telefono_conductor, v.nombre AS vehiculo_nombre, v.patente AS vehiculo_patente, v.capacidad AS vehiculo_capacidad, trabajadores.nombre_completo AS nombre_trabajador
                FROM traslados t 
                JOIN asistencia a ON t.id_traslado = a.id_traslado 
                JOIN trabajadores ON a.id_trabajador = trabajadores.id_trabajador
                JOIN conductores c ON t.nombre_conductor = c.nombre_completo
                JOIN vehiculos v ON c.id_vehiculo = v.id_vehiculo
                WHERE t.tipo_viaje = 'vuelta' AND DATE(t.fecha) = ?`;

            mysqlConnection.query(queryVuelta, [fechaActual], (errorVuelta, trasladosVuelta) => {
                if (errorVuelta) {
                    console.error('Error al obtener traslados de vuelta:', errorVuelta);
                    res.status(500).json({ message: 'Error al obtener traslados de vuelta' });
                } else {
                    // Formatear los datos según tus requisitos
                    const asistenciaHoy = {
                        trasladosIda,
                        trasladosVuelta
                    };
                    res.json(asistenciaHoy);
                }
            });
        }
    });
});


router.post('/traslados', (req, res) => {
    const { fecha, conductor, vehiculo, tipo_viaje, trabajadores, asistencias, comentarios } = req.body;
    const formattedFecha = new Date(fecha).toISOString().slice(0, 10);
    const fechaActual = new Date().toISOString().slice(0, 10);

    // obtener el valor de la van y taxi de la base de datos
    var valorPorPersona = 0;
    const personas = trabajadores.length;

    if (vehiculo.includes('van')) {
        mysqlConnection.query('SELECT * FROM valorvan WHERE id = 1', (error, valorVan) => {
            if (error) {
                console.error('Error al obtener valor van:', error);
                res.status(500).json({ message: 'Error al obtener valor van' });
            } else {
                const valor = valorVan[0];
                valorPorPersona = valor.valor / personas; // Aquí cambia a valor.valor
                continuarProceso();
            }
        });
    }
    if (vehiculo.includes('taxi')) {
        mysqlConnection.query('SELECT * FROM valortaxi WHERE id = 1', (error, valorTaxi) => {
            if (error) {
                console.error('Error al obtener valor taxi:', error);
                res.status(500).json({ message: 'Error al obtener valor taxi' });
            } else {
                const valor = valorTaxi[0];
                valorPorPersona = valor.valor / personas; // Aquí cambia a valor.valor
                continuarProceso();
            }
        });
    }

    function continuarProceso() {
        // Consultar la base de datos para verificar la existencia de traslados del mismo tipo
        mysqlConnection.query('SELECT * FROM traslados WHERE fecha = ? AND nombre_conductor = ? AND vehiculo = ? AND tipo_viaje = ?', [formattedFecha, conductor, vehiculo, tipo_viaje], (error, results) => {
            if (error) {
                console.error('Error al verificar traslados existentes:', error);
                res.status(500).json({ message: 'Error al verificar traslados existentes' });
            } else {
                if (results.length > 0) {
                    // Ya existe un traslado del mismo tipo para el mismo conductor, vehículo y fecha
                    res.status(400).json({ message: `Ya existe un traslado de ${tipo_viaje} para el conductor ${conductor}, vehículo ${vehiculo} y fecha ${formattedFecha}` });
                } else {
                    // No existe un traslado del mismo tipo, proceder con la inserción
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
                                    res.status(201).json({ message: 'Lista enviada correctamente' });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});


// eliminar traslado con su asistencia y comentarios
router.delete('/traslados/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM asistencia WHERE id_traslado = ?', [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar asistencias:', error);
            res.status(500).json({ message: 'Error al eliminar asistencias' });
        } else {
            mysqlConnection.query('DELETE FROM traslados WHERE id_traslado = ?', [id], (error, result) => {
                if (error) {
                    console.error('Error al eliminar traslado:', error);
                    res.status(500).json({ message: 'Error al eliminar traslado' });
                } else {
                    res.json({ message: 'Traslado eliminado correctamente' });
                }
            });
        }
    });
});





export default router;