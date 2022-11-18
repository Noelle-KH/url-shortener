const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000
const localhost = `http://localhost:${port}`

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/shorten', (req, res) => {
  res.render('shorten')
})

app.listen(port, () => {
  console.log(`Listening on ${localhost}`)
})