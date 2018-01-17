const express = require('express')
const openApi = require('express-openapi')
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const app = express()
app.use(bodyParser.json())

const api = openApi.initialize({
  app,
  apiDoc: {
    swagger: '2.0',
    basePath: '/api',
    info: {
      title: 'express-openapi example',
      version: '1.0.0'
    },
    consumes: ['application/json'],
    paths: {}
  },
  paths: path.join(__dirname, 'paths'),
  dependencies: {
    logger: console,
    usersCollection: []
  },
  errorMiddleware: (err, req, res, next) => {
    console.error(err)
    res.sendStatus(500)
  }
})

// init swagger-ui docs with the openapi dynamically generated doc
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerUrl: 'http://localhost:3000/api/api-docs'
}))

app.listen(port)