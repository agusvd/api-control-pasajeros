import express from 'express';
import mysqlConnection from '../database/db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// router
const router = express.Router();

// Registro de admin
router.post('/register/admin', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10); // Cambiado a bcrypt.hashSync
        const newUser = {
            nombre_completo: req.body.nombre_completo,
            usuario: req.body.usuario,
            password: hashedPassword
        };

        const query = 'INSERT INTO admin SET ?';
        mysqlConnection.query(query, newUser, (error, result) => { // Cambiado de sql a query
            if (error) {
                console.error('Error al registrar usuario:', error);
                res.status(500).json({ message: 'Error al registrar usuario' });
            } else {
                res.status(201).json({ message: 'Usuario registrado correctamente' });
            }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Registro de conductor
router.post('/register/conductor', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10); // Cambiado a bcrypt.hashSync
        const newUser = {
            nombre_completo: req.body.nombre_completo,
            telefono: req.body.telefono,
            id_vehiculo: req.body.id_vehiculo,
            usuario: req.body.usuario,
            password: hashedPassword
        };

        const query = 'INSERT INTO conductores SET ?';
        mysqlConnection.query(query, newUser, (error, result) => { // Cambiado de sql a query
            if (error) {
                console.error('Error al registrar conductor:', error);
                res.status(500).json({ message: 'Error al registrar conductor' });
            } else {
                res.status(201).json({ message: 'Conductor registrado correctamente' });
            }
        });
    } catch (error) {
        console.error('Error al registrar conductor:', error);
        res.status(500).json({ message: 'Error al registrar conductor' });
    }
});


// Login de usuario
router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    const query1 = 'SELECT * FROM admin WHERE usuario = ?';
    const query2 = 'SELECT * FROM conductores WHERE usuario = ?';
    // primero revisamos si es admin
    mysqlConnection.query(query1, [usuario], async (error, rows) => {
        if (!error) {
            if (rows.length > 0) {
                const admin = rows[0];
                const validPassword = bcrypt.compareSync(password, admin.password);
                if (validPassword) {
                    const user = {
                        id_admin: admin.id_admin,
                        nombre_completo: admin.nombre_completo,
                        usuario: admin.usuario,
                        role: 'admin'
                    }
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    console.log('Token generado:', accessToken);
                    console.log('Usuario:', user);
                    res.cookie('token', accessToken);
                    return res.status(200).json({ message: 'Usuario autenticado', user: user, token: accessToken });
                } else {
                    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
                }
            } else {
                // si no es admin, revisamos si es conductor
                mysqlConnection.query(query2, [usuario], async (error, rows) => {
                    if (!error) {
                        if (rows.length > 0) {
                            const conductor = rows[0];
                            const validPassword = bcrypt.compareSync(password, conductor.password);
                            if (validPassword) {
                                const user = {
                                    id_conductor: conductor.id_conductor,
                                    nombre_completo: conductor.nombre_completo,
                                    usuario: conductor.usuario,
                                    role: 'chofer'
                                }
                                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                                console.log('Token generado:', accessToken);
                                console.log('Usuario:', user);
                                res.cookie('token', accessToken);
                                return res.status(200).json({ message: 'Usuario autenticado', user: user, token: accessToken });
                            } else {
                                res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
                            }
                        } else {
                            res.status(401).json({ message: 'El usuario no existe' });
                        }
                    } else {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log(error);
        }
    });
});
// logout

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Saliste correctamente' });
})

export default router
