// https://quera.org/college/16059/chapter/64204/lesson/218072/?submissions_page=1


[a, b, c] = readline().split(' ')

off = 0 

if (a == "*" || b == "*" || c == "*"){
    off += 30
}

if (a == "s" || b == "s" || c == "s"){
    off += 10
}

if (a == 7 || b == 7 || c == 7){
    off += 5
}

console.log(off)