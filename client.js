const Swagger = require('swagger-client')

const user = {
  name: 'Bob Bobson',
  address: {}
}

Swagger('http://localhost:3000/api/api-docs')
  .then(client =>
      client
        .execute({operationId: 'createUser', parameters: {user}})
        .then(res => client.execute({operationId: 'getUsers', parameters: {limit: 10}}))
        .then(res => res.body[0].id)
        .then(id => client.execute({operationId: 'getUser', parameters: {id}}))
        .then(console.log)
        .catch(console.error)
  )
  .catch(console.error)
  