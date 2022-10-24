class Projeto {
    constructor(tipo, tecnologia, inicio, fim){
        this.tipo = tipo;
        this.tecnologia = tecnologia;
        this.inicio = inicio;
        this.fim = fim;

    }
}

class Pessoa {
    constructor(nome, imagem, descricao, cursos){
        this.nome = nome
        this.imagem = imagem
        this.descricao = descricao
        this.cursos = cursos
    }
}

module.exports = {
    Projeto: Projeto,
    Pessoa: Pessoa
}  
