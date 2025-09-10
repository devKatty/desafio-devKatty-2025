import { Animal } from "./animal.js";
import { Pessoa } from "./pessoa.js";

class AbrigoAnimais {
  constructor() { //inclusão direta dos animais do desafio
    this.animais = [
      new Animal("Rex",  "cão",      "RATO",  "BOLA"         ),
      new Animal("Mimi", "gato",     "BOLA",  "LASER"        ),
      new Animal("Fofo", "gato",     "BOLA",  "RATO", "LASER"),
      new Animal("Zero", "gato",     "RATO",  "BOLA"         ),
      new Animal("Bola", "cão",      "CAIXA", "NOVELO"       ),
      new Animal("Bebe", "cão",      "LASER", "RATO", "BOLA" ),
      new Animal("Loco", "jabuti",   "SKATE", "RATO"         )
    ]

    const regraEspecialGato = (gato, pessoa) => { //regra 3
      const brinquedosUsados = pessoa.animaisAdotados.flatMap( animal => animal.brinquedos);
      const meusBrinquedos = gato.brinquedos;
      const temBrinquedosDivididos = brinquedosUsados.filter( brinquedo => meusBrinquedos.includes(brinquedo) ).length > 0;

      if (temBrinquedosDivididos)
        return false; //não é adotável

      return true;
    }

    const regraEspecialLoco = (loco, pessoa) => { //regra 6
      const brinquedosEmComum = loco.brinquedos.filter(brinquedo => pessoa.brinquedos.includes(brinquedo));
      const temMeusBrinquedos = brinquedosEmComum.length === loco.brinquedos.length;
      const tenhoAmigos = pessoa.animaisAdotados.length > 0;

      if (temMeusBrinquedos && tenhoAmigos){
        loco.setAdotavel(true);
        loco.destino = pessoa.nome;
      }
      
      console.log(`${temMeusBrinquedos}, ${tenhoAmigos}`)

      /**
       * Como o Loco tem uma regra Permissiva,
       * Se Adotavel fosse false, mesmo que a regra passasse,
       * Loco não seria adotado.
       * Para contornar o problema, setei diretamente Adotavel para true
       * e retornei true para a função ter efeito neutro nos filtros
       */
      return true; 
    }

    this.animais[0].setRegrasEspeciais(regraEspecialGato);
    this.animais[1].setRegrasEspeciais(regraEspecialGato);
    this.animais[2].setRegrasEspeciais(regraEspecialGato);

    this.animais[6].setRegrasEspeciais(regraEspecialLoco);

  }

  #encontraAnimal(nome) {
    const animal = this.animais.find(a => a.nome === nome)
    return animal || false;
  }

  #temAnimaisDuplicados (ordem) {
    const set = new Set(ordem); //um Set não possui valores duplicados
    return [...set].length !== ordem.length;
  }

  #temAnimalForaDaLista (ordem) {
    for (let i = 0; i < ordem.length; i++) {
      const nomeAnimal = ordem[i];
      if (this.#encontraAnimal(nomeAnimal) === false){
        return true;
      }
    }
    return false;
  }

  //função principal
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const ordemAnimaisArray = ordemAnimais.split(",");
    const resultados = [];

    if (this.#temAnimaisDuplicados(ordemAnimaisArray) || this.#temAnimalForaDaLista(ordemAnimaisArray)) {
      return { lista: null, erro: 'Animal inválido' };
    }

    const pessoa1 = new Pessoa(1, brinquedosPessoa1);
    const pessoa2 = new Pessoa(2, brinquedosPessoa2);

    for (let i = 0; i < ordemAnimaisArray.length; i++) {
      const nome = ordemAnimaisArray[i].trim();
      const animal = this.#encontraAnimal(nome);
      if (animal === false) {
        return { lista: null, erro: 'Animal inválido' };
      }

      const aptoPessoa1 = animal.ehAdotavelPor(pessoa1);
      const aptoPessoa2 = animal.ehAdotavelPor(pessoa2);

      const apto = (aptoPessoa1 || aptoPessoa2) && !(aptoPessoa1 && aptoPessoa2); //XOR das pessoas, regra 4
      if (apto) {
        if (aptoPessoa1) {
          animal.destino = pessoa1.nome; //destino por padrão: "abrigo"
          pessoa1.animaisAdotados.push(animal);
        } else {
          animal.destino = pessoa2.nome;
          pessoa2.animaisAdotados.push(animal);
        }
      }

      resultados.push(`${animal.nome} - ${animal.destino}`);
    }

    const  resultadoOrdenado = resultados.sort((a, b) => {
        const nomeA = a.split(" - ")[0].toLowerCase();
        const nomeB = b.split(" - ")[0].toLowerCase();
        return nomeA.localeCompare(nomeB);
      })

    return { lista: resultadoOrdenado, erro: null };
    
  }

}

export { AbrigoAnimais }
