// https://quera.org/college/16059/chapter/64203/lesson/218045/?comments_page=1&comments_filter=ALL&submissions_page=1
// const r = require('readline-sync');
// function readline() {return r.question();}



let [x, y] = readline().split(' ').map(Number)

area = x * 100 * y * 100
tileSize = 5 * 4

tilesNeeded = area / tileSize

console.log(tilesNeeded)