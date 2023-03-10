const http = require('http')

const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact us')
        return response.end()
    },
    '/login:post': async (request, response) => {
        // response é um iterator!
        for await (const data of request) {
            const user = JSON.parse(data)
            if (user.username !== 'FelipeSantos' || user.password !== '123') {
                response.writeHead(401)
                response.write('Logging has failed!')
                return response.end()
            }
            response.writeHead(200)
            response.write('Logging has succeeded!')
            return response.end()
        }
    },
    default: (request, response) => {
        response.write('Hello World!')
        return response.end()
    }
}

const handler = (request, response) => {
    const { url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    return chosen(request, response)
}

const app =
    http.createServer(handler)
        .listen(3000, function () {
            console.log('Server is running')
        })

module.exports = app