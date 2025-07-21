// https://quera.org/college/16059/chapter/64208/lesson/218145/?comments_page=1&comments_filter=ALL&submissions_page=1


const n = readline()
const xlist = readline().split(' ').map(Number)

const min = Math.min(...xlist)
const max = Math.max(...xlist)

console.log("MAX:", max)
console.log("MIN:", min)