module.exports = (logger, usersCollection) => {
  const path = {
    get: (req, res, next) => {
      const user = usersCollection.find(user => req.params.id === user.id)
      user
        ? res.send(user)
        : res.sendStatus(404)
    }
  }
  path.get.apiDoc = getApiDoc
  return path
}

const getApiDoc = {
  description: 'Get User list',
  operationId: 'getUser',
  parameters: [{
    in: 'path',
    name: 'id',
    required: true,
    type: 'string'
  }],
  responses: {
    200: {
      description: 'Operation successful',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User id',
              example: '123456789'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'Jon Jonson'
            },
            address: {
              type: 'object',
              description: 'address object'
            }
          }
        }
      }
    },
    404: {description: 'User node found'}
  }
}
