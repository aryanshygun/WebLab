// https://quera.org/college/16059/chapter/64204/lesson/220704/?comments_page=1&comments_filter=ALL

const [a, b, c] = readline().split(' ').map(Number)
const d = (a + b + c) / 3;
if (a == b && b == c)
    console.log(0)
else if (a == d || b == d || c == d)
    console.log(1)
else
    console.log(2)