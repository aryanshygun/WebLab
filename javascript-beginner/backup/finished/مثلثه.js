// https://quera.org/college/16059/chapter/64204/lesson/218066/?comments_page=1&comments_filter=ALL

// a = 3
// b = 4
// c = 5

let [a, b, c] = readline().split(' ').map(Number)


if (a + b > c && a + c > b && b + c > a){
    console.log('Bale')
} else {
    console.log('Na')
}