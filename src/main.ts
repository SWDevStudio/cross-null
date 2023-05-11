enum PLAYERS  {
    X = 'X',
    O = 'O'
}

let currentPlayer = PLAYERS.X
const filed = document.querySelector('.field')
const boxes = filed.querySelectorAll('.field__box')
const userTag = document.querySelector('.menu-user-tag')?.querySelector('span')
boxes.forEach(i => i.addEventListener('click', onClickBox))
function onClickBox(event) {
    if (event.target.innerHTML) return
    event.target.innerHTML = currentPlayer
    currentPlayer = currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X

    // Проверить что по определенным координатам не совпало что стоят
    const fieldSize = 3

    userTag.innerHTML = currentPlayer
}
