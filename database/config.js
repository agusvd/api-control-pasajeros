import dotenv from 'dotenv'
dotenv.config(); // Carga las variables de entorno desde el archivo .env

export const DB_HOST = process.env.DB_HOST|| 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || 'control_pasajeros'
export const DB_PORT = process.env.DB_PORT || '3306'
