// https://quera.org/college/16059/chapter/64205/lesson/218079/?comments_page=1&comments_filter=ALL&submissions_page=1


let [x, y] = readline().split(' ').map(Number)

let xlist = [];
for (let i = x + 1; i < y; i++) {
    if (i % 2 != 0) {
        xlist.push(i);
    }
}

console.log(xlist.join(' '));
