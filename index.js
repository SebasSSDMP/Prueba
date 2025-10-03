/** 
 * @autor: Harol Mauricio Gómez Zapata
 * @fecha: 25/08/2025
 * @descripcion: Pequeña aplicación para probar
 *               una base de datos en un contenedor
 *               Docker
*/

import express from 'express'
import mongoose from 'mongoose'

// Definición del esquema y modelo
const Usuarios = mongoose.model('Usuarios', new mongoose.Schema({
    usuario: String,
    correo: String,
    clave: String,
}));

const app = express();

// Conexión a MongoDB usando variable de entorno o fallback local
const mongoURL =
    process.env.MONGO_URL ||
    "mongodb://root:r0O7@mongo:27017/mibd?authSource=admin";

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas
app.get('/', async (_req, res) => {
    console.log("📋 Listado de usuarios ...");
    const usuarios = await Usuarios.find();
    return res.send(usuarios);
});

app.get('/crear', async (_req, res) => {
    console.log("➕ Insertando usuario ...");
    await Usuarios.create({
        'usuario': 'harol',
        'correo': 'hmgomezz@sena.edu.co',
        'clave': '12345'
    });
    return res.send("Usuario creado ✅");
});

app.get('/nueva', async (_req, res) => {
    return res.send("Ruta creada en desarrollo OK");
});

app.get('/otra', async (_req, res) => {
    return res.send("Ruta creada en desarrollo OK");
});

app.get('/de_nuevo', async (_req, res) => {
    return res.send("Ruta creada en desarrollo OK");
});

// Servidor
app.listen(3000, () => console.log("🚀 Escuchando en el puerto: 3000"));
