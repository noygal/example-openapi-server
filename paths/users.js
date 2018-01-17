module.exports = (logger, usersCollection) => {
  const path = {
    get: (req, res, next) => res.send(usersCollection.slice(0, parseInt(req.query.limit || '20'))),
    post: (req, res, next) => {
      usersCollection.push(Object.assign(req.body, {id: `${Date.now()}`}))
      res.sendStatus(200)
    }
  }
  path.get.apiDoc = getApiDoc
  path.post.apiDoc = postApiDoc
  return path
}

const getApiDoc = {
  description: 'Get User list',
  operationId: 'getUsers',
  parameters: [{
    in: 'query',
    name: 'limit',
    default: 20,
    type: 'number',
    description: 'List length limit'
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
            }
          }
        }
      }
    },
    401: {description: 'Operation forbidden'}
  }
}

const postApiDoc = {
  description: 'Create user',
  operationId: 'createUser',
  parameters: [{
    in: 'body',
    description: 'User Object',
    name: 'user',
    required: true,
    schema: {
      type: 'object',
      required: ['name', 'address'],
      properties: {
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
            }
          }
        }
      }
    },
    401: {description: 'Operation forbidden'}
  }
}
