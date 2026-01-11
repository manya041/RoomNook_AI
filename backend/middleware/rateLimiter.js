const store = new Map()

const cleanup = () => {
  const now = Date.now()
  for (const [key, bucket] of store.entries()) {
    if (bucket.resetAt <= now) store.delete(key)
  }
}

setInterval(cleanup, 30000).unref()

const rateLimiter = ({ windowMs = 60000, max = 10, keyGenerator }) => {
  return (req, res, next) => {
    const key = keyGenerator ? keyGenerator(req) : req.ip
    const now = Date.now()
    const bucket = store.get(key) || { count: 0, resetAt: now + windowMs }
    if (bucket.resetAt <= now) {
      bucket.count = 0
      bucket.resetAt = now + windowMs
    }
    bucket.count += 1
    store.set(key, bucket)
    if (bucket.count > max) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000)
      res.set('Retry-After', String(retryAfter))
      return res.status(429).json({ success: false, code: 'RATE_LIMITED', message: 'Too many requests', requestId: req.requestId })
    }
    next()
  }
}

module.exports = rateLimiter