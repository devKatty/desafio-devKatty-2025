import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
});


describe('regras específicas do Gato', () => {
  test('Deve Aceitar Bola e Mimi', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,CAIXA,LASER,NOVELO','RATO','Bola,Mimi');

    expect(resultado.lista[0]).toBe('Bola - pessoa 1');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
  });

  test('Fofo fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,LASER','RATO','Mimi,Fofo');

    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
  });


  test('Mimi fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,LASER','RATO','Fofo,Mimi');

    expect(resultado.lista[0]).toBe('Fofo - pessoa 1');
    expect(resultado.lista[1]).toBe('Mimi - abrigo');
  });
});

describe('regras específicas do Loco', () => {
  test('Loco tem amigos e brinquedos na ordem errada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,SKATE,BOLA','RATO','Zero,Loco');

    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Zero - pessoa 1');

  });
});
