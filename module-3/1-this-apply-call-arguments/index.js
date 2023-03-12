'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
    async watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        await this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

// watch(__filename, async (event, filename) => {
//     console.log((await readFile(filename)).toString())
// })

const file = new File()
// dessa forma, ele ignora o 'this' da classe File
// herda o 'this' do contexto de execução ( herda do watch )
// watch(__filename, file.watch)

//alternativa para não herdar o 'this' da função
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explicito qual é o contexto que a função deve seguir
// o bind retorna uma função com o 'this' qeu se mantem de file, ignorando o this do watch
// watch(__filename, file.watch.bind(file))

// a diferenca entre um e outro é que um vc passa os argumentos como array e o outro uma lista de argumentos
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])