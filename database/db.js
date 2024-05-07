import mysql from 'mysql'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js'

const sql = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});

sql.connect(error => {
    if(error) {
        console.error('Error al conectarse a la base de datos: ', error)
    } else {
        console.log('>> MySQL conectado correctamente <<')
    }
})

export default sql
