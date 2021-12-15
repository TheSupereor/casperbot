import express from 'express'
const router = express.Router();

import { getAllNews, 
         AddNews,
         GetSingleNew,
         UpdateNew,
         DeleteNew
        } from'../controllers/noticias.controller.js'

router.route('/')
    .get(getAllNews)
    .post(AddNews)

router.route('/:id')
    .get(GetSingleNew)
    .put(UpdateNew)
    .delete(DeleteNew)

export default router;