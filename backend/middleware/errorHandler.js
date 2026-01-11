const { observeError } = require('../utils/metrics')

module.exports = (err, req, res, next) => {
  const status = err.status || 500
  const code = err.code || 'INTERNAL_ERROR'
  const message = err.message || 'Something went wrong'
  const errors = err.errors || undefined
  const requestId = req.requestId
  observeError()
  res.status(status).json({ success: false, code, message, errors, requestId })
}