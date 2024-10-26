// https://quera.org/college/16059/chapter/64208/lesson/220940/

function filterUniqueNamesWithMinimumAge(names) {
    let nameAgeMap = {}

    for (let i = 0; i < names.length; i++) {
        let [name, age] = names[i].split(' ')
        age = parseInt(age)

        if (!(name in nameAgeMap) || age < nameAgeMap[name]) {
            nameAgeMap[name] = age
        }
    }
    let sortedList = Object.entries(nameAgeMap).sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
    return sortedList.map(([name, age]) => `${name} : ${age}`)
}

const n = parseInt(readline())
const namesArray = []
for (let i = 0; i < n; i++) {
    namesArray.push(readline())
}

console.log(filterUniqueNamesWithMinimumAge(namesArray).join('\n'))
