const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const allowMethods = ['POST', 'GET']
const controllers = []

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

function addControllers(dir = 'controllers') {
  const files = fs.readdirSync(path.join(__dirname, '..', dir))
  const routeFiles = files.filter(f => f.endsWith('.js'))
  for (let f of routeFiles) {
    console.log(`process controller: ${f}...`)
    const mapping = require(path.join(__dirname, '..', dir, f))
    const router = new Router()
    addMapping(router, mapping)
    controllers.push(router)
  }
}

module.exports = function(dir) {
  // 如果不传参数，扫描目录默认为'controllers'
  addControllers(dir)

  return controllers.map(router => router.routes())
}
