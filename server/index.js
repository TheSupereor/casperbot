import app from './server.js';
import dotenv from 'dotenv'
dotenv.config()
import mongodb from 'mongodb'

//dados do mongodb
const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGO_URI;
const port = 3000;

MongoClient.connect(uri)
.catch(err => {
    console.log(err.stack)
    process.exit(1)
}).then( async client => {
    const collection = client.db('DadosLivros').collection('noticias');
    const usersCollecion = client.db('DadosLivros').collection('users')
    //disponibilizando a collection globalmente
    app.locals.collection = collection;
    app.locals.usersCollecion = usersCollecion;
    app.listen(port, console.log('Server rodando na porta 3000'))
})
