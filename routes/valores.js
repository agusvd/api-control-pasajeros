import express from 'express'
import sql from '../database/db.js'

const router = express.Router()

// obtener valor taxi id 1
router.get('/valor-taxi/:id', (req, res) => {
    const { id } = req.params
    sql.query('SELECT * FROM valortaxi WHERE id = ?', [id], (error, rows) => {
        if (!error) {
            res.json(rows)
        } else {
            console.log(error)
        }
    })
})

// obtener valor van id 1
router.get('/valor-van/:id', (req, res) => {
    const { id } = req.params
    sql.query('SELECT * FROM valorvan WHERE id = ?', [id], (error, rows) => {
        if (!error) {
            res.json(rows)
        } else {
            console.log(error)
        }
    })
})

// crear valor taxi
router.post('/valor-taxi', (req, res) => {
    const { valor } = req.body
    const newValor = {
        valor
    }

    const query = 'INSERT INTO valortaxi SET ?'
    sql.query(query, newValor, (error, result) => {
        if (error) {
            console.error('Error al registrar valor:', error)
            res.status(500).json({ message: 'Error al registrar valor' })
        } else {
            res.status(201).json({ message: 'Valor registrado correctamente' })
        }
    })
})

// crear valor van
router.post('/valor-van', (req, res) => {
    const { valor } = req.body
    const newValor = {
        valor
    }

    const query = 'INSERT INTO valorvan SET ?'
    sql.query(query, newValor, (error, result) => {
        if (error) {
            console.error('Error al registrar valor:', error)
            res.status(500).json({ message: 'Error al registrar valor' })
        } else {
            res.status(201).json({ message: 'Valor registrado correctamente' })
        }
    })
})

// editar valor taxi
router.put('/valor-taxi/:id', (req, res) => {
    const { valor } = req.body
    const { id } = req.params
    const updateValor = {
        valor
    }

    const query = 'UPDATE valortaxi SET ? WHERE id = ?'
    sql.query(query, [updateValor, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar valor:', error)
            res.status(500).json({ message: 'Error al actualizar valor' })
        } else {
            res.status(200).json({ message: 'Valor actualizado correctamente' })
        }
    })
})

// editar valor van
router.put('/valor-van/:id', (req, res) => {
    const { valor } = req.body
    const { id } = req.params
    const updateValor = {
        valor
    }

    const query = 'UPDATE valorvan SET ? WHERE id = ?'
    sql.query(query, [updateValor, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar valor:', error)
            res.status(500).json({ message: 'Error al actualizar valor' })
        } else {
            res.status(200).json({ message: 'Valor actualizado correctamente' })
        }
    })
})

export default router