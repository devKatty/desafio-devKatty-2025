import { Animal } from "./animal.js"

function verificaOrdem(brinquedosPessoa, brinquedosAnimal) {
  let i = 0
  let j = 0

  while (i < brinquedosPessoa.length && j < brinquedosAnimal.length) {
    if (brinquedosPessoa[i] === brinquedosAnimal[j]) {
      j++
    }
    i++
  }

  return j === brinquedosAnimal.length
}

class AbrigoAnimais {
  constructor() {
    this.animais = [
      new Animal("Rex", "cão"),
      new Animal("Mimi", "gato"),
      new Animal("Fofo", "gato"),
      new Animal("Zero", "gato"),
      new Animal("Bola", "cão"),
      new Animal("Bebe", "cão"),
      new Animal("Loco", "jabuti")
    ]

    this.animais[0].adicionaBrinquedo(["RATO", "BOLA"])
    this.animais[1].adicionaBrinquedo(["BOLA", "LASER"])
    this.animais[2].adicionaBrinquedo(["BOLA", "RATO", "LASER"])
    this.animais[3].adicionaBrinquedo(["RATO", "BOLA"])
    this.animais[4].adicionaBrinquedo(["CAIXA", "NOVELO"])
    this.animais[5].adicionaBrinquedo(["LASER", "RATO", "BOLA"])
    this.animais[6].adicionaBrinquedo(["SKATE", "RATO"])
  }

  encontraAnimal(nome) {
    const animal = this.animais.find(a => a.nome === nome)
    return animal || false
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const ordemAnimaisArray = ordemAnimais.split(",")
    const resultados = []

    for (let i = 0; i < ordemAnimaisArray.length; i++) {
      const nome = ordemAnimaisArray[i].trim()
      const animal = this.encontraAnimal(nome)

      if (animal === false) {
        return { lista: null, erro: 'Animal inválido' }
      }

      const pessoa1 = verificaOrdem(brinquedosPessoa1, animal.brinquedos)
      const pessoa2 = verificaOrdem(brinquedosPessoa2, animal.brinquedos)

      if (pessoa1 && pessoa2) {
        resultados.push(`${nome} - abrigo`)
      } else if (pessoa1) {
        resultados.push(`${nome} - pessoa 1`)
      } else if (pessoa2) {
        resultados.push(`${nome} - pessoa 2`)
      } else {
        resultados.push(`${nome} - abrigo`)
      }
    }

    return { lista: resultados, erro: null }
  }
}

export { AbrigoAnimais }
