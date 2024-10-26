const num = Math.round(Math.random() * 100); 

let counter = 0;
function moveBlue(){
    let ran = Math.round((Math.random())*100)
    counter += ran
    console.log('f')
    console.log(counter)
    if (counter<450){
        document.getElementById('bluesqr').style.width = `${counter}px`
    } else {
        alert("You Win!")
    }
}

function moveRed(){
    let ran = Math.round((Math.random())*100)
    counter += ran
    if (counter<450){
        document.getElementById('redsqr').style.width = `${counter}px`
    } else {
        alert("You Win!")
    }
}