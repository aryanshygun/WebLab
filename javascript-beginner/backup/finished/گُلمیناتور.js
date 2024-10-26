// https://quera.org/college/16059/chapter/64205/lesson/221985/?comments_page=1&comments_filter=ALL&submissions_page=1

let [x, y] = readline().split(' ').map(Number)

let z = 1

let count = 1
while (z < x) {
    x -= z
    z *= y
    count += 1
}

console.log(count)