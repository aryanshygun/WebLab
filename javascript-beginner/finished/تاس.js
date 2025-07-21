// https://quera.org/college/16059/chapter/64205/lesson/218095/?comments_page=1&comments_filter=ALL&submissions_page=1

let bijanScore = 0;
let bahroozScore = 0;
let mohsenScore = 0;

while (true) {
    let [a, b, c] = readline().split(' ').map(Number);

    if (a === b && b === c) {
        break;
    }

    if (a < b && a < c) {
        bijanScore += 1;
    }
    else if (b < a && b < c) {
        bahroozScore += 1;
    }
    else if (c < a && c < b) {
        mohsenScore += 1;
    }
}

if (bijanScore > bahroozScore && bijanScore > mohsenScore) {
    console.log("Eyval Bijan!");
} else {
    console.log("Ey baba! Eshkal nadare.");
}
