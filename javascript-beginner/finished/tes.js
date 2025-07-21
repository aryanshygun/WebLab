const filterArray = (n, i) => i % 2 === 0;
const isOdd = (n) => n % 2 === 1;
const is3 = (n) => n % 3 === 0;
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = a.filter(filterArray);
const c = b.filter(filterArray);
const res1 = b.every(isOdd);
const res2 = c.some(is3);
console.log(res1, res2);