// https://quera.org/college/16059/chapter/64204/lesson/218074/?comments_page=1&comments_filter=ALL
const r = require('readline-sync');
function readline() {return r.question();}

let [x1, y1] = readline().split(' ').map(Number);
let [x2, y2] = readline().split(' ').map(Number);
let [x3, y3] = readline().split(' ').map(Number);

if (x1 === x2) {
    let delta = Math.abs(y1 - y2);
    x4 = x3;
    if (y3 === Math.max(y1, y2)) {
        y4 = Math.abs(y3 - delta);
    } else {
        y4 = Math.abs(y3 + delta);
    }
    console.log(`${x4} ${y4}`);

} else if (x2 === x3) {
    let delta = Math.abs(y2 - y3);
    x4 = x1;
    if (y1 === Math.max(y2, y3)) {
        y4 = Math.abs(y1 - delta);
    } else {
        y4 = Math.abs(y1 + delta);
    }
    console.log(`${x4} ${y4}`);

} else if (x1 === x3) {
    let delta = Math.abs(y1 - y3);
    x4 = x2;
    if (y2 === Math.max(y1, y3)) {
        y4 = Math.abs(y2 - delta);
    } else {
        y4 = Math.abs(y2 + delta);
    }
    console.log(`${x4} ${y4}`);
}