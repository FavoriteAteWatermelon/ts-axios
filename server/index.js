const app = require('express')()
const express = require('express')
const port =  3000
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./src/webpack.config')
const compiler = webpack(config)


app.use(express.static(__dirname))
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


app.listen(port,() => {
  console.log(`the app is listen in ${port}`)
})
