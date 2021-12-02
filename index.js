const width = 28;
let score = 0
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let squares = []

///Layout
    //28 * 28 = 784
    // 0 - coin
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-up
    // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
        
        if (layout[i] === 0) {
            squares[i].classList.add('coin')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2){
            squares[i].classList.add("ghost-lair")
        } else if (layout[i] === 3){
            squares[i].classList.add("power-up")
        }
    }
}

createBoard()
////PacMan Control 
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add("pacman")

document.addEventListener('keyup', movePacman)

function movePacman(event) {
    
    squares[pacmanCurrentIndex].classList.remove("pacman")
    
    switch(event.key) {
        case "ArrowDown":
            if (
            !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + width < width * width
            ) 
            pacmanCurrentIndex += width
            break;
            
            case "ArrowUp":
                
        if (!squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0) pacmanCurrentIndex -= width
            break;

            case "ArrowLeft": 
            if( !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - 1 ].classList.contains('wall') &&
            pacmanCurrentIndex % width !==0) pacmanCurrentIndex -=1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            
        break;
        
        case "ArrowRight":
            if(!squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width -1) pacmanCurrentIndex +=1
            if(pacmanCurrentIndex === 391){
                pacmanCurrentIndex =364
            }
        break;
        
    }
    
    squares[pacmanCurrentIndex].classList.add("pacman");
    eatCoin();
    eatPowerUp();
    checkForWin();
    checkForGameOver();
    
};

///
///Ghost creation 
class Ghost {
    constructor(className,startIndex,speed,){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost')
})

///
///Ghost Navigation
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    console.log('moved ghost')
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)
    
    ghost.timerId = setInterval(function() {
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
                squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className)  
        squares[ghost.currentIndex].classList.add('ghost')  
    } else direction = directions[Math.floor(Math.random() * directions.length)]
    
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")){
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 100
            scoreDisplay.innerHTML = score
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
        
    }, ghost.speed )
    
}


////Misc functions

function eatCoin() {
    if (squares[pacmanCurrentIndex].classList.contains("coin")){
        squares[pacmanCurrentIndex].classList.remove("coin")
        score ++
        scoreDisplay.innerHTML = score
    }
}

function eatPowerUp() {
    
    if (squares[pacmanCurrentIndex].classList.contains('power-up')) {
    score +=10
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove('power-up')
    
    ghosts.forEach(ghost => ghost.isScared = true)
    
         
    setTimeout(unScareGhosts, 10000)   
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

function checkForWin() {
    if (score === 274) {
        
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        scoreDisplay.innerHTML = 'You WON!'
    }
}
function checkForGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
     ) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'You LOSE'
     }
}

////