const mongoose = require('mongoose')
const Url = require('../url-model')
const urlData = require('./url-data.json')

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
  Url.insertMany(urlData)
  console.log('done')
})