const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('kcors')
const helmet = require('koa-helmet')
const dotenv = require('dotenv')
const controller = require('./controllers')

dotenv.config()

const corsConfig = {
  origin: ctx => ctx.header.origin,
  credentials: true // 是否带cookie
}
// error handler
onerror(app)

// middlewares
app
  // 日志输出
  .use(logger())
  // 跨域处理
  .use(cors(corsConfig))
  // 网络安全策略
  .use(helmet())
  // 静态文件
  .use(require('koa-static')(__dirname + '/static'))
  // body parser
  .use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
controller(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
