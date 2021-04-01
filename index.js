//servidor e rotas
const express = require('express');
const petshop = require('./petshop');
const app = express();


app.listen(3000, ()=> {
    console.log('servidor rodando');
});


console.log(petshop.listarPets());