// https://quera.org/college/16059/chapter/64206/lesson/218103/?comments_page=1&comments_filter=ALL&submissions_page=1

let [a, b, c, d] = readline().split(' ').map(Number)

sum = a + b + c 
if ( sum % d == 0) {
    console.log('nemituni')
} else {
    console.log('mituni')
}