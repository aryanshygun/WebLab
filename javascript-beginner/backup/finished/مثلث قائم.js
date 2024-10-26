// https://quera.org/college/16059/chapter/64204/lesson/218067/?comments_page=1&comments_filter=ALL&submissions_page=1

let [x, y, z] = readline().split(' ').map(Number)

if ( x == 0 || y == 0 || z == 0) {
    console.log("Na")
}
else if ( x + y + z != 180) {
    console.log("Na")
}
else if ( x == 90 || y == 90 || z == 90 ) {
    console.log("Bale")
} else {
    console.log("Na")
}