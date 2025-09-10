class Pessoa {
    animaisAdotados = [];

    constructor(numero, brinquedos) {
        this.nome = `pessoa ${numero}`;
        this.brinquedos = brinquedos;
    }

    adicionarAnimalAdotado(animal){
        this.animaisAdotados.push(animal);
    }
}

export { Pessoa as Pessoa };