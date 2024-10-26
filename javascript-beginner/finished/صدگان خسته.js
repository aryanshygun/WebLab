//https://quera.org/college/16059/chapter/64204/lesson/218073/?comments_page=1&comments_filter=ALL

// x = 492
// y = 478

// x = readline()
// y = readline()


xRev = x.toString().split('').reverse().join('')
yRev = y.toString().split('').reverse().join('')

if (xRev > yRev) {
    console.log(`${y} < ${x}`)
} else if ( xRev == yRev) {
    console.log(`${y} = ${x}`)
} else {
    console.log(`${x} < ${y}`)
}