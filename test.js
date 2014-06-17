var test = require('tape')
var DS = require('./')
var levelup = require('levelup')
var memdown = require('memdown')

var N = 10
var db = levelup('.test', {db: memdown})
var ds = DS(db)

test('should be not have anything (has)', function(t) {
  t.plan(N * 2)
  for (var i = 0; i < N; i++) {
    ds.has('i/' + i, function(err, has, key) {
      t.notOk(err, 'should be fine')
      t.notOk(has, 'should be false')
    })
  }
})

test('should not have anything (get)', function(t) {
  t.plan(N * 2)
  for (var i = 0; i < N; i++) {
    ds.get('i/' + i, function(err, obj, key) {
      t.equal(err, DS.errors.NotFound, 'should be NotFound')
      t.notOk(obj, 'should be undefined')
    })
  }
})

test('should be able to put', function(t) {
  t.plan(N)
  for (var i = 0; i < N; i++) {
    ds.put('i/' + i, i * 1000, function(err, val, key) {
      t.notOk(err, 'should be fine')
    })
  }
})

test('should now have the nums (has)', function(t) {
  t.plan(N * 2)
  for (var i = 0; i < N; i++) {
    ds.has('i/' + i, function(err, has, key) {
      t.notOk(err, 'should be fine')
      t.equal(has, true, 'should be true')
    })
  }
})

test('should now have the nums (get)', function(t) {
  t.plan(N * 2)
  for (var i = 0; i < N; i++) {
    ds.get('i/' + i, function(err, obj, key) {
      t.notOk(err, 'should be fine')
      t.equal(obj, '' + (parseInt(key.last(), 10) * 1000), 'should be undefined')
    })
  }
})
