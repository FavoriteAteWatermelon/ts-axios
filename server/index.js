const app = require('express')()
const express = require('express')
const port =  3000
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./src/webpack.config')
const bodyParser = require('body-parser')
const compiler = webpack(config)


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(webpackDevMiddleware(compiler,{
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
  
}))
app.get('/test',(req,res) => {
  res.json({
    'dd0': 'dddd'
  })
})
app.get('/base/get',(req,res) => {
  res.json(req.query)
})
app.get('/error/get',(req,res) => {
  if (Math.random() > 0.5) {
    res.json({
      msg: 'hello world'
    })
  } else {
    res.status(500)
    res.end()
  }
})

app.get('/error/timeout',(req,res) => {
  setTimeout(() => {
    res.json({
      msg: 'hello world'
    })
  }, 3000)
})
// post 请求 info在body里头，get是在query里头
app.post('/base/post',(req,res) => {

  res.json(req.query)
})
app.post('/base/buffer',(req,res) => {
  let msg = []
  req.on('data',(chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end',()=> {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})


app.listen(port,() => {
  console.log(`the app is listen in ${port}`)
})
