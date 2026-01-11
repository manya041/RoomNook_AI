const { observeRequest } = require('../utils/metrics')

module.exports = (req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    observeRequest(duration)
  })
  next()
}