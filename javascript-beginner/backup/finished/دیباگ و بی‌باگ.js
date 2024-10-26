// https://quera.org/college/16059/chapter/64204/lesson/218063/?comments_page=1&comments_filter=ALL&submissions_page=1

const [a, b, c] = readline().split(' ');
const [x, y, z] = readline().split(' ').map(Number);

if (a == b) {
    if (x >= y && x >= z) {
        console.log("Max : " + x);
    }
    else if (y >= x && y >= z) {
        console.log("Max : " + y);
    }
    else if (z >= x && z >= y) {
        console.log("Max : " + z);
    }
} else if (a == c) {
    if (x <= y && x <= z) {
        console.log("Min : " + x);
    }
    else if (y <= x && y <= z) {
        console.log("Min : " + y);
    }
    else if (z <= x && z <= y) {
        console.log("Min : " + z);
    }
} else {
    console.log("None");
}