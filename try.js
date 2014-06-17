var assert = require('assert')
var levelup = require('levelup')
var memdown = require('memdown')
var DS = require('./')

var db = levelup('.test', {db: memdown})
var ds = DS(db)

ds.put('foo', 'bar', function(err, val, key) {
  if (err) throw err
  console.log('put ' + key + ': ' + val)
  assert(val === 'bar')
})

ds.has('foo', function(err, has, key) {
  if (err) throw err
  console.log(key + ' exists? ' + has)
  assert(has === true)
})

ds.get('foo', function(err, val, key) {
  if (err) throw err
  console.log('get ' + key + ': ' + val)
  assert(val === 'bar')
})

ds.delete('foo', function(err, key) {
  if (err) throw err
  console.log(key + ' deleted')
})

ds.has('foo', function(err, has, key) {
  if (err) throw err
  console.log(key + ' exists? ' + has)
  assert(has === false)
})
