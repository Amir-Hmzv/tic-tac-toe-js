const tailes = document.querySelectorAll('.taile')
const Player_X = 'X'
const Player_O = 'O'
let turn = Player_X


let boardState = Array(tailes.length)
boardState.fill(null)
console.log(boardState);


const strike = document.getElementById('strike')
const gameOver = document.getElementById('game-over')
const gameOverText = document.getElementById('game-over-text')
const palyAgain = document.getElementById('paly-again')
palyAgain.addEventListener('click',startNew)

tailes.forEach(taile => taile.addEventListener('click', taileClick))

function textHover() {
    tailes.forEach(item => {
        item.classList.remove('x-hover')
        item.classList.remove('o-hover')
    })

    const hov = `${turn.toLowerCase()}-hover`;


    tailes.forEach(taile => {
        if (taile.innerText == '') {
            taile.classList.add(hov)
        }

    })
}

textHover()

function taileClick(e) {
    if (gameOver.classList.contains('show')) {
        return;
    }

    const taile = e.target
    const taileNumber = taile.dataset.list


    if (taile.innerText != '') {
        return;
    }


    if (turn === Player_X) {
        taile.innerText = Player_X
        boardState[taileNumber-1 ] = Player_X
        turn = Player_O
    } else {
        taile.innerText = Player_O
        boardState[taileNumber -1] = Player_O
        turn = Player_X
    }
    textHover()
    checkwinner()
}

function checkwinner() {
    for (const win of wining) {
        const {
            combo,
            strikeClass
        } = win
       
     
        const tailevalue1 = boardState[combo[0] - 1]
        const tailevalue2 = boardState[combo[1] - 1]
        const tailevalue3 = boardState[combo[2] - 1]
       

        if (tailevalue1 != null && tailevalue1 === tailevalue2 && tailevalue1 === tailevalue3) {
            strike.classList.add(strikeClass) 
            gameOversc(tailevalue1)
            return;
        }
        const checkDraw = boardState.every((tile) => tile != null)
        if (checkDraw) {
            gameOversc(null)
          
        }
    }
}

  

function gameOversc(winer) {
    let text = 'Darw'

    if (winer != null) {
       text = `winner is ${winer}`
    }
    gameOver.classList.add('show')
    gameOverText.innerText = `${text}`
    
}
function startNew(){
    gameOver.className = 'hidden'
    strike.className = 'strike'
    boardState.fill(null)
    tailes.forEach(taile =>  taile.innerText = '')
     turn = Player_X
    textHover()
}
const wining = [{
        combo: [1, 2, 3],
        strikeClass: 'strike-row-1'
    },
    {
        combo: [4, 5, 6],
        strikeClass: 'strike-row-2'
    },
    {
        combo: [7, 8, 9],
        strikeClass: 'strike-row-3'
    },
    //col
    {
        combo: [1, 4, 7],
        strikeClass: 'strike-col-1'
    },
    {
        combo: [2, 5, 8],
        strikeClass: 'strike-col-2'
    },
    {
        combo: [3, 6, 9],
        strikeClass: 'strike-col-3'
    },
    //din
    {
        combo: [1, 5, 9],
        strikeClass: 'strike-diagonal-1'
    },
    {
        combo: [3, 5, 7],
        strikeClass: 'strike-diagonal-2'
    },
]