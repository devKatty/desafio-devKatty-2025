class Animal{
    constructor(nome, especie){
        this.nome = nome;
        this.especie = especie;
        this.brinquedos = [];
    }

    adicionaBrinquedo(brinquedinhos){
        this.brinquedos.push(...brinquedinhos);
    }
}

export{Animal};