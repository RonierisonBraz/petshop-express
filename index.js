//servidor e rotas
const { response } = require('express');
const express = require('express');
const petshop = require('./petshop');
const app = express();

app.use(express.json());


app.get('/pets/:nome', (request, response) =>{
    const { nome } = request.params;


    return response.send(petshop.buscarPet(nome));
})

app.post('/pets', (request, response) =>{
    const  {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos} = request.body

    const novoPet = {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos}

    petshop.adicionarPet(novoPet)


    return response.send(novoPet);
})



app.listen(3000, ()=> {
    console.log('servidor rodando');
});


// console.log(petshop.listarPets());