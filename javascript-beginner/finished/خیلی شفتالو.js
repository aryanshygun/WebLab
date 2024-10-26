// https://quera.org/college/16059/chapter/64205/lesson/218091/?comments_page=1&comments_filter=ALL
const n = parseInt(readline());
let sum = 0;

for (let i = 1; i <= n; i++) {
    let z = 0;
    let row = '';
    
    for (let j = 1; j <= i; j++) {
        z += j;
        row += j;
        if (j < i) {
            row += '+';
        }
    }
    
    row += ' = ' + z;
    console.log(row);
    sum += z;
}

console.log('Total sum of series is:', sum);