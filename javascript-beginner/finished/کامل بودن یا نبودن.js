// https://quera.org/college/16059/chapter/64205/lesson/218080/?comments_page=1&comments_filter=ALL&submissions_page=1x = readline()

x = readline()
y = 0

for (let i = 1; i < x; i++){
    if (x % i == 0){
        y += i
    }
}

if (x == y){
    console.log('YES')
} else {
    console.log('NO')
}
