let x = 294
const bi = 2
let xstr = ''

while (x > 0) {
    
    xstr += (x % bi)
    x = Math.floor(x / bi)
}

console.log(xstr)