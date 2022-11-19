function randomCombination(combination) {
  return combination[Math.floor(Math.random() * combination.length)]
}

function getShortenUrl() {
  const combination = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortenUrl = ''
  for (let i = 0; i < 5; i++) {
    shortenUrl += randomCombination(combination)
  }

  return shortenUrl
}

module.exports = getShortenUrl