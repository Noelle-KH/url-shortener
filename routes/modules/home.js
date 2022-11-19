const express = require('express')
const router = express.Router()
const Url = require('../../models/url-model')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:shortenUrl', (req, res) => {
  const shortenUrl = req.params.shortenUrl
  Url.findOne({ shortenUrl })
    .lean()
    .then(url => {
      res.redirect(url.trueUrl)
    })
    .catch(error => console.log(error))
})

module.exports = router