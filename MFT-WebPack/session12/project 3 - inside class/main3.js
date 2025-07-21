let x = 2

while (x <= 100) {
    let i = 2
    // let isPrime = true;
    while (i < x) {
        if (x % i == 0) {
            isPrime = false
            break
        }
        i++
    }
    // if (isPrime) {
    //     console.log(x)
    // }
    if (i == x) {
        console.log(x)
    }
    x++
}