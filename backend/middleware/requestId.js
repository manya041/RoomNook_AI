const { randomUUID } = require('crypto')

module.exports = (req, res, next) => {
  const id = typeof randomUUID === 'function' ? randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  req.requestId = id
  res.locals.requestId = id
  next()
}