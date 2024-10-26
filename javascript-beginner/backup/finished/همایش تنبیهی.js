//https://quera.org/college/16059/chapter/64206/lesson/218104/?comments_page=1&comments_filter=ALL&submissions_page=1

let [a, b] = readline().split(' ').map(Number)
a = 10 - a + 1 
if (b > 10) {
    b = Math.abs(b - 10) + 1 
    console.log(`Left ${a} ${b}`)
} else {
    b = 10 - b + 1 
    console.log(`Right ${a} ${b}`)

}