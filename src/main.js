import { AbrigoAnimais } from "./abrigo-animais.js"

const abrigo = new AbrigoAnimais()
const resultado = abrigo.encontraPessoas(
  ["RATO","BOLA"], 
  ["RATO","NOVELO"], 
  "Rex,Fofo,Mimi,Bola"
)

console.log("Ordem original:")
resultado.lista.forEach(r => console.log(r))

console.log("\nOrdem alfabética:")
const resultadosOrdenados = [...resultado.lista].sort((a, b) => {
  const nomeA = a.split(" - ")[0].toLowerCase()
  const nomeB = b.split(" - ")[0].toLowerCase()
  return nomeA.localeCompare(nomeB)
})
resultadosOrdenados.forEach(r => console.log(r))
