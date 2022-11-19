const db = require('../../config/mongoose')
const Url = require('../url-model')
const urlData = require('./url-data.json')

db.once('open', () => {
  Url.insertMany(urlData)
  console.log('done')
})