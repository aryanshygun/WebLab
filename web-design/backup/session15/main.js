let xlist = [20, 3, 5, 90, 7, 3, 120, 5, 8, 13, 74, 12, 43];

var x = xlist[0];

for (let i = 0; i < xlist.lengh; i++) {
    if (xlist[i] > x) {
        x = xlist[i];
    }
}

console.log(x);
