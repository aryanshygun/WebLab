// https://quera.org/college/16059/chapter/64204/lesson/218075/?comments_page=1&comments_filter=ALL&submissions_page=1


const r = require('readline-sync');
function readline() {return r.question();}

let a = parseInt(readline());
let b = parseInt(readline());
let c = parseInt(readline());
let d = parseInt(readline());

if (a >= b && a >= c && a >= d) {
    console.log(a);
} else if (b >= a && b >= c && b >= d) {
    console.log(b);
} else if (c >= a && c >= b && c >= d) {
    console.log(c);
} else {
    console.log(d);
}