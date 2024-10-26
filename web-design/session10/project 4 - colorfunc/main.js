const leftDiv = document.getElementById('left')
const midDiv = document.getElementById('mid')
const rightDiv = document.getElementById('right')

let leftColor = prompt('select left color:')
let midColor = prompt('select mid color:')
let rightColor = prompt('select right color:')

function setColor(xDiv, xColor) {
    xDiv.style.backgroundColor = xColor
}

setColor(leftDiv, leftColor)
setColor(midDiv, midColor)
setColor(rightDiv, rightColor)  