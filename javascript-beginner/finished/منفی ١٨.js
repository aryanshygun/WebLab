// https://quera.org/college/16059/chapter/64208/lesson/224160/?comments_page=1&comments_filter=ALL&submissions_page=1

function checkAge (ageList) {
    const filteredArray = ageList.filter(younger18);
    filteredArray.sort(sortAge);
    return filteredArray;
}

function younger18 (age){
    return age <= 18;
}

function sortAge(a, b){
    return a - b;
}

const ageList = readline().split(' ').map(Number);
console.log(...checkAge(ageList));