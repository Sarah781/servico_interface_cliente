/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Sarah
*/


/* importando o express */
const express = require('express')
const axios = require('axios')
const app = express();
const port = 5001;

const servicoPersistenciaBaseURL = 'http://localhost:5004'

/* importando o modelo */
const modelo = require('./models/modelos');
var Projeto = modelo.Projeto; //Vinculação de tipo
var Pessoa = modelo.Pessoa;


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './views');

/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('public'));

app.get('/', aboutHandler);
app.get('/sobre-mim', aboutHandler);
app.get('/portfolio', listProjectHandler);

app.listen(port, listenHandler);

/* Os dados a seguir, em uma aplicação real, deveriam vir de um BD */
async function aboutMe() {
    const response = await axios.get(`${servicoPersistenciaBaseURL}/pessoa`)
    const pessoa = response.data[0]
    return new Pessoa(pessoa.nome, pessoa.imagem, pessoa.descricao, pessoa.cursos.split(";"));
}

async function aboutHandler(req, res){
    res.render('sobre_mim.ejs', {pessoa: await aboutMe()});    
}

async function listProjects() {
    const projetos = []
    const response = await axios.get(`${servicoPersistenciaBaseURL}/projetos`)
    response.data.forEach(projeto => {
       projetos.push(new Projeto(projeto.nome, projeto.linguagem, projeto.anoInicio, projeto.anoFim))
    })

    return projetos
}

async function listProjectHandler(req, res){
    res.render('listar_projetos.ejs', {lista_projetos: await listProjects()});    
}

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}
