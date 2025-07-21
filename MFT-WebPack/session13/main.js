
// const userList = []
// function addToList() {
//     const userName = document.getElementById('name').value
//     const userPass = document.getElementById('pass').value
    
//     userList.push([userName, userPass])
//     document.getElementById('user-list').textContent = userList
//     userName.value = ''
//     userPass.value = ''
// }



const userList = []
const passList = []
function addToList() {
    const userName = document.getElementById('name').value
    const userPass = document.getElementById('pass').value
    userList.push(userName)
    passList.push(userPass)
    document.getElementById('user-list').textContent = userList
    document.getElementById('pass-list').textContent = passList

    userName.textContent = ''
    userPass.textContent = ''
}
// text = 'salam\nali'
// console.log(text)
// let xlist = [['ryam','123'], ['ali','456']]
// for (let i = 0; i < xlist.length; i++){
//     for (let j = 0; j< xlist[i].length; j++ ){
//         console.log(xlist[i][j])
//     }
//     // console.log(xlist[i])
// }