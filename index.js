var DS = require('datastore.abstract')

module.exports = LevelDS

function LevelDS(level) {
  if (!(this instanceof LevelDS))
    return new LevelDS(level)
  DS.call(this)
  this.level = level
}

DS.inherits(LevelDS)

LevelDS.prototype._get = function(key, cb) {
  this.level.get(key.toString(), function(err, val) {
    if (err && err.type == 'NotFoundError')
      return cb(DS.errors.NotFound, null, key)
    if (err)
      return cb(err, null, key)

    cb(null, val, key)
  })
}

LevelDS.prototype._put = function(key, val, cb) {
  this.level.put(key.toString(), val, function(err) {
    cb(err, val, key)
  })
}

LevelDS.prototype._delete = function(key, cb) {
  this.level.del(key.toString(), function(err) {
    cb(err, key)
  })
}

LevelDS.prototype._has = function(key, cb) {
  this.level.get(key.toString(), function(err, val) {
    if (err && err.type == 'NotFoundError')
      return cb(null, false, key)
    if (err)
      return cb(err, null, key)

    cb(null, true, key)
  })
}
