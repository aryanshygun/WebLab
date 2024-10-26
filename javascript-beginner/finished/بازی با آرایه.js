// https://quera.org/college/16059/chapter/64208/lesson/224159/?comments_page=1&comments_filter=ALL&submissions_page=1

function game (command){
    const codes = command.split(' ').map(Number);
    const mode = codes[0];
    if (mode === 1){
        const m = codes[1];
        const copyArr = [...numbers];
        for (let i = 0; i < numbers.length ; i++){
            copyArr[i] += m;
        }
        console.log(...copyArr);
        return true;
    }
    else if (mode === 2){
        const m = codes[1];
        const copyArr = [...numbers];
        for (let i = 0; i < numbers.length ; i++){
            copyArr[i] *= m;
            if (copyArr[i] === 0){
                copyArr[i] = 0;
            }
        }
        console.log(...copyArr);
        return true;
    }
    else if (mode === 3){
        return false;
    }
}

const numbers = readline().split(' ').map(Number);
while (game(readline())){

}