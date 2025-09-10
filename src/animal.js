class Animal{
    destino = "abrigo";
    brinquedos = [];
    verificaRegrasEspeciais = null; // (pessoa) => { ... }

    constructor(nome, especie, ...brinquedinhos) {
        this.nome = nome;
        this.especie = especie;
        this.brinquedos = [...brinquedinhos];
    }

    adicionaBrinquedos(...brinquedinhos) {
        this.brinquedos.push(...brinquedinhos);
    }

    setRegrasEspeciais (regrasEspeciais) {
        this.verificaRegrasEspeciais = regrasEspeciais;
    }

    setAdotavel(bool) {
        this.adotavel = bool;
    }

    ehAdotavelPor(pessoa) {
        let adotavel = false;

        const emOrdem = this.#verificaOrdem(pessoa.brinquedos); //regras 1 e 2
        const menorQueTres = pessoa.animaisAdotados.length <3; //menor que três <3, regra 5
        if (emOrdem && menorQueTres) {
            adotavel = true;

            if (this.verificaRegrasEspeciais)
                adotavel = adotavel && this.verificaRegrasEspeciais(this, pessoa); //suporte generalizado para as regras 3 e 6.
            /**
             * Esta função só funciona nesta posição do código pensando que os animais
             * serão verificados com base na ordem da entrada. Por exemplo, se o Loco é
             * o primeiro da lista e é invalidado pela ordem, ele ainda poderia ser adotado
             * caso uma companhia posterior fosse adotada. Porém, acredito traria uma complexidade
             * ao código fora do que foi sugerido pelo desafio. Ou seja, as regras do gato e do Loco 
             * apenas serão validadas com base nos animais anteriores da lista...
             */
        }

        return adotavel;
    }

    //TODO: comentar estratégia
    #verificaOrdem(brinquedosPessoa) {
        brinquedosPessoa = brinquedosPessoa.split(',');

        let i = 0;
        let j = 0;

        while (i < brinquedosPessoa.length && j < this.brinquedos.length) {
            if (brinquedosPessoa[i] === this.brinquedos[j]) {
                j++;
            }
            i++;
        }

        return j === this.brinquedos.length;
    }
}

export{ Animal as Animal };