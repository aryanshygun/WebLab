let boys = ['ali', 'reza', 'mohammad', 'hossein','kasra','hassan']
let girls = ['rojin', 'negin', 'mehrsa', 'armita','sarah', 'maraym']

let i = 0
while (i < boys.length - 1){

    boys[i] = girls[i+1]
    girls[i] = boys[i+1]
    i += 2
}

// for (let i = 0; i < boys.length - 1; i += 2){
//     boys[i] = girls[i+1]
//     girls[i] = boys[i+1]
//     i += 2
// }

console.log(boys)
console.log(girls)
