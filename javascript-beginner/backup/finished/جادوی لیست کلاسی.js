// https://quera.org/college/16059/chapter/64208/lesson/220907/?comments_page=1&comments_filter=ALL

function sortNames(names) {

    function isShort(name) {
        let firstName = name.split(' ')[0]
        return firstName.length <= 6
    }

    function sortBySecondWord(arr) {
        return arr.sort((a, b) => {
            let secondWordA = a.split(' ')[1][0]
            let secondWordB = b.split(' ')[1][0]
            return secondWordA.localeCompare(secondWordB)
        });
    }
    names = names.filter(isShort)
    sortlist = sortBySecondWord(names)
    return sortlist
}

const r = require('readline-sync');
function readline() {return r.question();}



const n = parseInt(readline());
const namesArray = [];
for (let i = 0; i < n; i++) 
    namesArray.push(readline());


console.log(sortNames(namesArray).join('\n'));
