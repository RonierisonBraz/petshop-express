//

const fs = require('fs');
const moment = require('moment');//biblioteco para apresentar a hora.

let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop = {//Estou passando todos os metodos como modulo

    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(bancoDados, null, 2);

        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
    },
    listarPets: () => {

        let textoListarPets = "PETSHOP \n";
        bancoDados.pets.forEach((pet) => {

            textoListarPets += (`${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${pet.raca}, ${(pet.vacinado) ? 'vacinado' : 'não vacinado'} \n`);
            pet.servicos.forEach((servico) => {
                textoListarPets += (`${servico.data} - ${servico.nome}`);
            })
        })
        return textoListarPets;
    },

    vacinarPet: (pet) => {

        if (pet.vacinado === true) {
            console.log(`${pet.nome} já está vacinado`);
        } else {
            pet.vacinado = true;
            console.log(`${pet.nome} foi vacinado com sucesso. `);
        }
    },

    apararUnhasPet: (pet) => {
        pet.servicos.push({
            tipoServ: 'corte de unhas',
            data: moment().format('DD-MM-YYYY')
        });
        petshop.atualizarBanco();
        console.log(`${pet.servicos.data} : ${pet.nome} está de unhas aparadas!`);
    },

    atenderCliente: (pet, funcao) => {
        console.log(`\nAtendendo ${pet.nome}`)
        funcao(pet);
        console.log("Fim do atendimento");
    },
    vacinacaoPets: () => {
        totalVacinados = 0;


        bancoDados.pets = bancoDados.pets.map((pet) => {
            if (!pet.vacinado) {
                vacinarPet(pet);
                petVacinadosCampanha++;
            }

            return pet;
        });
        console.log(`${totalVacinados} animais foram vacinados nessa campannha.`)
    },
    adicionarPet: (nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos) => {
        novoPet = {
            nome,
            tipo,
            idade,
            raca,
            peso,
            tutor,
            contato,
            vacinado,
            servicos
        }

        bancoDados.pets.push(novoPet);
        petshop.atualizarBanco();
    },
    darBanhoPet: (pet) => {
        pet.servicos.push('banho');
        petshop.atualizarBanco();
        console.log(`O pet ${pet.nome} foi realizado o banho`);
    },
    tosarPet: (pet) => {
        pet.servicos.push('tosa');
        petshop.atualizarBanco();
        console.log(`O pet ${pet.nome} esta com o cabelinho na régua`);
    },
    buscarPet: (nomePet) => {

        let petEncontrado = bancoDados.pets.find((pet) => {
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    },

    filtrarTipoPet: (tipoPet) => {
        // && E - AND
        // || OU - OR
        // == verifica valores iguais
        // === verifica valores e tipos iguais
        let petsEncontrados = bancoDados.pets.filter((pet) => {
            return pet.tipo == tipoPet;
        });

        return petsEncontrados;
    },

    clientePremium: (pet) => {
        let nServicos = pet.servicos.length;

        if (nServicos > 5) {
            console.log(`Olá, ${pet.nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${pet.nome}! Você ainda não tem descontos disponiveis!`);
        }
    }
}

module.exports = petshop;