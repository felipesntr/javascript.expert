const { evaluateRegex } = require("./util.js");
// o objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. Muito similar ao padrão Builder
// a diferença que aqui é sobre processos, o Builder sobre construcao
// de objetos
class TextProcessorFluentAPI {
  // propriedade privada!
  #content;
  constructor(content) {
    this.#content = content;
  }
  extractPeopleData() {
    // ?<= fala que vai exatrai os dados que virao depois desse grupo
    // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressao para pegar maiusculo ou minusculo)
    // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaco
    // tudo acima fica dentro de um paranteses para falar "vamos pegar dai para frente"

    // (?!)negative look around, vai ignorar os contratantes do fim do documento(que tem so espaco a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele paare na primeira recorrencia, assim ele evita ficar em loop
    // $ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> insensitive

    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    );
    const onlyPerson = this.#content.match(matchPerson);
    // console.log(onlyPerson);
    this.#content = onlyPerson;
    return this;
  }
  divideTextInColumns() {
    const splitRegext = evaluateRegex(/,/);
    this.#content = this.#content.map((person) => person.split(splitRegext));
    return this;
  }
  removeEmptyCharacters() {
    const regexTrim = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) =>
      line.map((field) => field.replace(regexTrim, ""))
    );
    return this;
  }
  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
