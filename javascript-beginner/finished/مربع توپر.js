// https://quera.org/college/16059/chapter/64207/lesson/220216/?comments_page=1&comments_filter=ALL

function printSquarePattern(squareSideLength, skipLines, character) {
    while (squareSideLength >= 1) {
        for (let i = 1; i <= squareSideLength; i++) {
            console.log(character.repeat(squareSideLength))
        }
        squareSideLength -= skipLines
    }
}

const [n, k, c] = readline().split(' ');
printSquarePattern(parseInt(n), parseInt(k), c);