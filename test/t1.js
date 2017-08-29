function handleValue(value) {
  if (!value) return ''
  var i = 1, p = value.length - 3 * i
  var result = ''
  while (p > 0) {
    result = ',' + value.substr(p, 3) + result
    p = value.length - 3 * ++i
  }
  if (p <= 0) {
    result = value.substr(0, p + 3) + result
  }
  return result
}

var r = handleValue('1')
console.log(r)
console.log(r.replace(/,/g, ''))
