let x = 2;

while (x <= 100) {
    let i = 2
    let isPrime = true;
    
    while (i < x) {
        if (x % i == 0) {
            break
        }
        i++
    }
    
    if (isPrime) {
        console.log(x)
    }
    
    x++
}