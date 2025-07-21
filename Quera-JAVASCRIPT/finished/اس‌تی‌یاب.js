// https://quera.org/college/16059/chapter/64207/lesson/220215/?comments_page=1&comments_filter=ALL


function printPattern(n, shape) {
    if (shape == 't'){
        for ( let i = n; i >= 1; i--){
            console.log('*'.repeat(i))
        }
    }
    else if (shape == 's') {
        for ( let i = 1; i <= n; i++ ){
            console.log('*'.repeat(n))
        }
    }
}

const [n, shape] = readline().split(' ');
const size = parseInt(n);
printPattern(size, shape);