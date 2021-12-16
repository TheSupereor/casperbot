import express from 'express'
const app = express();
const port = 5500;

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/pages'));

// app.get('/' || '/Login', (req, res) => {
//     res.send('pages/Auth/Login')
// })

app.listen(port || 5500, () => {
    console.log(`Server frontend rodando na porta ${port}`)
})