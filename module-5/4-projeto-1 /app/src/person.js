const { evaluateRegex } = require("./util");

class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // ^ -> começo da string
    // + -> um ou mais ocorrencias
    // (\w{1}) -> pega a primeira letra e guarda no grupo 1
    // ([a-zA-Z]+$) -> pega o resto da string e guarda no grupo 2, adicion
    // o + para pegar todas as letras até o fim da string.
    // g -> para pegar todas as ocorrencias
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    const formatFirstLetter = (word) =>
      word.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`;
      });

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    // tudo que não for digito vira vazio
    // /g serve para remover todas as ocorrencias
    this.documento = documento.replace(evaluateRegex(/\D/g), "");
    // começa a procurar depois do " a " e pega tudo que vem a frente
    // (?<= faz com que ignore tudo que tiver antes desse match
    // conhecido como positive lookBehind
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/))[0];
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/))[0];
    this.estado = estado.replace(evaluateRegex(/\.$/), "");
  }
}

module.exports = Person;
