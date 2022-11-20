const express = require('express')
const router = express.Router()
const Url = require('../../models/url-model')
const getShortenUrl = require('../../randomShortenUrl')
const localhost = `http://localhost:3000`

router.post('/', (req, res) => {
  const trueUrl = req.body.trueUrl
  Url.findOne({ trueUrl })
    .lean()
    .then(url => {
      if (!url) {
        const getUrl = getShortenUrl()
        const shortenUrl = `${localhost}/${getUrl}`
        Url.create({
          trueUrl, shortenUrl: getUrl
        })
          .then(() => {
            res.render('shorten', { shortenUrl })
          })
          .catch(error => console.log(error))
      } else {
        const shortenUrl = `${localhost}/${url.shortenUrl}`
        res.render('shorten', { shortenUrl })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router