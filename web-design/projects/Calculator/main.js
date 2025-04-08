const screen = document.getElementById('screen')

function append(x){
    if (screen.textContent == 0){
        screen.textContent = x
    } else{
        screen.textContent += x
    }
}

function cleanUp(){
    screen.textContent = 0; 
}

function calc(){
    screen.textContent = eval(screen.textContent)
}