// https://quera.org/college/16059/chapter/64207/lesson/220710/?comments_page=1&comments_filter=ALL

function nextPrimeAfterSumOfDigits(number) {
    let xlist = String(number).split('');
    let b = 0;
    
    for (let i = 0; i < xlist.length; i++) {
        b += parseInt(xlist[i]);
    }

    function isPrime(x) {
        if (x < 2) return false;
        for (let i = 2; i <= Math.sqrt(x); i++) {
            if (x % i === 0) {
                return false;
            }
        }
        return true;
    }

    let count = 0;
    let currentNum = number + 1;

    while (count < b) {
        if (isPrime(currentNum)) {
            count += 1;
        }
        if (count < b) {
            currentNum += 1;
        }
    }

    return currentNum;
}

let n = parseInt(readline());
console.log(nextPrimeAfterSumOfDigits(n));