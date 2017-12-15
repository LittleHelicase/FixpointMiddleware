
var fact_ = fact => i => (i === 0) ? 1 : (i * fact(i - 1))

var FIX = f => x => f(FIX(f))(x)

var fact = FIX(fact_)

console.log(fact(1))
console.log(fact(3))

var wrap = f => f_ => p => {
  var result = f(f_)(p)
  console.log(result)
  return result
}

var fact__ = FIX(wrap(fact_))

fact__(4)
fact__(3)

console.log('MEMOIZE')

var memoize = f => {
  var storage = []
  return f_ => x => {
    if (!storage[x]) {
      storage[x] = f(f_)(x)
    }
    return storage[x]
  }
}

var fact_m = FIX(memoize(fact_))
var fact_m_w = FIX(memoize(wrap(fact_)))

console.log(fact_m(5))

fact_m_w(5)
fact_m_w(6)

var wrap_ct = f_ => f__ => ctb => x => {
  var result = f_(f__([].concat([x], ctb)))(x)
  console.log(ctb, x, result)
  return result
}

console.log('extra wrapping')

var fact_ct = FIX(wrap_ct(fact_))([])

console.log(fact_ct(4))
