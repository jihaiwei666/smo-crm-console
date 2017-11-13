const str = '12345.33'

let integer = str
let decimal = ''
if (str.indexOf('.') != -1) {
  integer = str.substring(0, str.indexOf('.'))
  decimal = str.substring(str.indexOf('.'))
}

console.log(integer)
console.log(decimal)