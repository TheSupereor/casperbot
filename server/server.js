import express from 'express';
import cors from 'cors'
import noticias from './api/routes/noticias.route.js'
import auth from './api/routes/auth.route.js'

const app = express()

//habilitar uso de json e conexão entre mesmo usuário (cors)
app.use(cors())
app.use(express.json())

app.use("/api/v1/noticias", noticias);
app.use("/api/v1/auth", auth);
app.use('*', (req, res) => res.status(404).json({error: 'Não encontrado'}))

export default app
