const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Url = require('./models/url-model')

if (process.env.NODE_URL !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000
const localhost = `http://localhost:${port}`

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  const url = req.body.url
  Url.findOne({ url })
    .lean()
    .then(url => {
      const shortenUrl = `${localhost}/${url.shortenUrl}`
      res.render('shorten', { shortenUrl })
    })
    .catch(error => console.log(error))
})

app.get('/:shortenUrl', (req, res) => {
  const shortenUrl = req.params.shortenUrl
  Url.findOne({ shortenUrl })
    .lean()
    .then(url => {
      res.redirect(url.url)
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Listening on ${localhost}`)
})