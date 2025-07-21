// https://quera.org/college/16059/chapter/64206/lesson/218108/?comments_page=1&comments_filter=ALL&submissions_page=1

let [x, y] = readline().split(' ').map(Number)

a = 1 + y 
b = 1 
z = a % x 

while (z != 1) {
    a += y 
    z = a % x 
    b += 1
}

console.log(b)