// let star = 'x'
// let space = '   '
// let i = 1
// let result = 'x'

// while (i < 5) {

//     result = star + star
//     console.log(star)


//     i += 1

// }

// let row = 4
// let i = 1
// let space = '     '
// let star = 'x'

// while (i <= row) {
//     space -= ' '
//     star = star.repeat(2*i - 1)
//     console.log(space + star)

//     i += 1
// }

// let i = 1;
// while (i <= 4) {
//     space = ' '.repeat(4 - i)
//     star = '*'.repeat(2*i - 1)
//     console.log(space + star)
//     i += 1
// }               

var i = 1
var bounding = 15
while (i < bounding) {
    var line = ''
    var space_string = ""
    var star_string = ''
    var spaces = bounding - i
    var j = 0
    while(j < Math.floor(spaces/2)){
        space_string += " "
        j += 1
    
    }

    var k = 0
    while(k < i ) {
        star_string += "*"
        k += 1
    }

    line += space_string + star_string
    console.log(line)
    i += 2
}