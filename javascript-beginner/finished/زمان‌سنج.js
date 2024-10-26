// https://quera.org/college/16059/chapter/64203/lesson/218043/?comments_page=1&comments_filter=ALL&submissions_page=1

// const r = require('readline-sync');
// function readline() {return r.question();}

// x = 52134
// let x = 3680
let x = readline()
hour = Math.floor(x / 3600)
x = x - hour*3600

min = Math.floor(x / 60)
x = x - min*60

sec = x

// console.log(hour)
// console.log(min)
// console.log(sec)

console.log(`${hour} : ${min} : ${sec}`)