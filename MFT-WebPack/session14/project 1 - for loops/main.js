let names1 = ['ali', 'reza', 'mohammad', 'hossein']
let names2 = ['jack', 'kate', 'alex', 'max']

for (let i = 0; i < names1.length; i += 2) {
    let temp1 = names1[i]
    let temp2 = names2[i]
    names1[i] = temp2
    names2[i] = temp1
    // [names1[i], names2[i]] = [names2[i], names1[i]]
}


console.log(names1)
console.log(names2)

