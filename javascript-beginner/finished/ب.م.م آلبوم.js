//  https://quera.org/college/16059/chapter/64207/lesson/220219/?comments_page=1&comments_filter=ALL&submissions_page=1

function combineGcds(a, b, c, d, e) {
    function gcd(x, y) {
        while (y != 0){
            let temp = y
            y = x % y 
            x = temp 
        }
        return x
    }
    
    let xlist = [a, b, c, d, e]
    let result = xlist[0]
    
    for (let i = 1; i < xlist.length; i++) {
        result = gcd(result, xlist[i])
    }
    return result
}

const [a, b, c, d, e] = readline().split(' ').map(Number);
console.log(combineGcds(a, b, c, d, e));