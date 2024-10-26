// https://quera.org/college/16059/chapter/64205/lesson/218094/?comments_page=1&comments_filter=ALL&submissions_page=1

for (let i = 1; i <= 10; i++) {
    let row = '';
    for (let j = 1; j <= 10; j++) {
        if (i === j) {
            row += '0 ';
        } else if (i > j) {
            row += (i * j) + ' ';
        } else {
            row += (-i * j) + ' ';
        }
    }
    console.log(row);
}