let xlist = ['a', 'b', 'c', 'd', 'f']
let i = 0
let tempList = []
while (i < xlist.length){
    // i++
    let index = i % xlist.length
    // xlist[index] = temp
    // temp = xlist[i+1]
    tempList[index] = xlist[index+1]
    i++
}


console.log(tempList)