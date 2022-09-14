/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Sarah
*/

/* importando o express */
const express = require('express')
const app = express();
const port = 5000;

/* importando o modelo */
const modelo = require('./models/modelos');
var Projeto = modelo.Projeto; //Vinculação de tipo


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './views');

/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('public'));

app.get('/', aboutHandler);
app.get('/sobre-mim', aboutHandler);
app.get('/portfolio', listProjectHandler);

app.listen(port, listenHandler);

function aboutHandler(req, res){
    res.render('sobre_mim.ejs');    
}

/* Os dados a seguir, em uma aplicação real, deveriam vir de um BD */
function listProjects() {
    return [
        new Projeto("CyberMind", "JavaScript", 2020, 2020),
        new Projeto("GSW", "C#", 2021, 2021),
        new Projeto("IonicHealth", "C#", 2021, 2021),
        new Projeto("SrSoja", "React Native", 2022, 2022),
    ];
}

function listProjectHandler(req, res){
    res.render('listar_projetos.ejs', {lista_projetos: listProjects()});    
}

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}