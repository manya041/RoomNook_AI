const store = new Map()

const set = (key, value, ttlMs) => {
  const expires = Date.now() + ttlMs
  store.set(key, { value, expires })
}

const get = (key) => {
  const entry = store.get(key)
  if (!entry) return null
  if (entry.expires < Date.now()) {
    store.delete(key)
    return null
  }
  return entry.value
}

const del = (key) => {
  store.delete(key)
}

const delByPrefix = (prefix) => {
  for (const k of store.keys()) {
    if (k.startsWith(prefix)) store.delete(k)
  }
}

module.exports = { set, get, del, delByPrefix }