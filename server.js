const express = require('express');
const cors= require('cors')
const formidableMiddleware = require('express-formidable');
const app= express()
app.use(cors()) //configuração do servidor
//app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(formidableMiddleware());
//são middlewears fszem validação ou filtro ou incluir algo
const bodyParser= require('body-parser')
const multer = require('multer');
app.use(bodyParser.urlencoded({extended: true}))
const rotas =  require('../rest_api/server/routes/questaoRoute.js')
app.use('/', rotas)



//app.use('/', require('./rest_api/server/route/questaoRoute'));
/*
app.get('/', (req, res)=>{
    return res.json({message:'okay'})
})
*/


app.listen(3001)