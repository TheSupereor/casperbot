import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId;

const getAllNews = async (req, res) => {
    const arrayNoticias = []
    const collection = req.app.locals.collection;

    var noticias = await collection.find();
    noticias.forEach(function(doc, err){
        arrayNoticias.push(doc)
    }, function(){
        res.send({items: arrayNoticias})
    })
}

const AddNews = async (req, res) => {
    const collection = req.app.locals.collection;
    var newsName = {
        imagem: req.body.imagem,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        tema: req.body.tema,
        link: req.body.link,
    }

    collection.insertOne(newsName, function(err, result){
        if(!err)
            res.status(201).json({message: "Nova noticia criada!", noticia: newsName})
        else
            res.json({error: err})
    })
}

const GetSingleNew = async (req, res) => {
    const { id } = req.params;
    const collection = req.app.locals.collection;

    var noticia = await collection.findOne({_id: ObjectId(id)});
    res.send({item: noticia})
}

const UpdateNew = async (req, res) => {
    const { id } = req.params;
    const { imagem, titulo, descricao, tema, link } = req.body
    const collection = req.app.locals.collection;

    try {
        const update = collection.updateOne(
            {
                _id: ObjectId(id)
            },{
                $set: {
                    imagem: imagem,
                    titulo: titulo,
                    descricao: descricao,
                    tema: tema,
                    link: link
                }
            }
        )    
        res.json({update})
    } catch (err) {
        res.json({error: err})
        console.log(err)
    }
}

const DeleteNew = async (req, res) => {
    const { id } = req.params;
    const collection = req.app.locals.collection;

    try {
        collection.deleteOne({ _id: ObjectId(id) })
        res.json({message: "Deletado com sucesso!"})
    } catch (err) {
        res.json({error: err})
    }
}

export{
    getAllNews,
    AddNews,
    GetSingleNew,
    UpdateNew,
    DeleteNew
}