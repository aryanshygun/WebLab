// https://quera.org/college/16059/chapter/64208/lesson/218139/?comments_page=1&comments_filter=ALL

function matrixAddition(rows, columns, matrix_a, matrix_b) {

    const sum = []
    for (let i = 0; i < rows; i++){
        sum[i] = []
        for (let j = 0; j < columns; j++) {
            sum[i][j] = matrix_a[i][j] + matrix_b[i][j]
        }
    }
    return sum
}

const a = [];
const b = [];

const [n, m] = readline().split(' ').map(Number);
for (let i = 0; i < n; i++)
    a.push(readline().split(' ').map(Number));

for (let i = 0; i < n; i++)
    b.push(readline().split(' ').map(Number));

const c = matrixAddition(n, m, a, b);
for (let i = 0; i < n; i++)
    console.log(c[i].join(' '));
