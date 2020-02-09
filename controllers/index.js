const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const allowMethods = ['POST', 'GET']

function getName(filename) {
  return filename.substr(0, filename.indexOf('.'))
}

function addMethod(router, method, path, fn) {
  if (allowMethods.includes(method.toUpperCase())) {
    router[method](path, fn)
  }
}

function addMapping(router, mapping) {
  for (const url in mapping) {
    const splitUrl = url.split(' ')
    if (splitUrl.length > 1) {
      addMethod(router, splitUrl[0].toLowerCase(), splitUrl[1], mapping[url])
    }
  }
}

function addControllers(app) {
  const files = fs.readdirSync(__dirname)
  const routeFiles = files.filter(f => f.endsWith('.js'))
  for (let f of routeFiles) {
    if (f === 'index.js') continue
    console.log(`process controller: ${f}...`)
    const mapping = require(path.join(__dirname, f))
    const router = new Router({ prefix: '/' + getName(f) })
    addMapping(router, mapping)
    app.use(router.routes()).use(router.allowedMethods())
  }
}

module.exports = addControllers
