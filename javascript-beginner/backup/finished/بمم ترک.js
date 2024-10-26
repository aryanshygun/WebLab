// https://quera.org/college/16059/chapter/64205/lesson/218086/?comments_page=1&comments_filter=ALL&submissions_page=1

let [a, b] = readline().split(' ').map(Number)

while (b != 0 ) {
    let temp = b
    b = a % b
    a = temp;
}


console.log(a)