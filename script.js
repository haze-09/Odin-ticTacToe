
function createPlayer(name,symbol){
    return{name,symbol};
};

function createSquare(){
    let value = 0;

    const getValue = () => value;
    const changeValue = (symbol) => value = symbol;

    return {getValue,changeValue};
}

const gameBoard = (function (){
    let array = []

    for(let i = 0; i < 3; i++){
        array.push([])
        for(let j = 0; j < 3; j++){
            array[i].push(createSquare());
        };
    };

    const showBoard = () => {
        for(let i = 0; i < 3; i++){   
            let row = [];         
            for(let j = 0; j < 3; j++){
                row.push(array[i][j].getValue());       
            }
            console.log(row.join());
            console.log('');
        }

    };

    const changeBoard = (i,j,symbol) => {
        if(array[i][j].getValue() === 0){
            array[i][j].changeValue(symbol);
        };     
    };

    const getBoard = () => array;

    const getSquareValue = (i,j) => array[i][j].getValue();


    return {showBoard,changeBoard,getBoard,getSquareValue};

})();

const gameLogic = (function(){

    function rowCheck(array){
        return  array.every(square => square.getValue() !== 0 && square.getValue() === array[0].getValue());
    };

    function columnCheck(array) {

        for (let col = 0; col < 3; col++) {
            if (array[0][col].getValue() !== 0 &&
                array[0][col].getValue() === array[1][col].getValue() &&
                array[1][col].getValue() === array[2][col].getValue()) {
                return true;
            }
        }
        
    };

    function diagonal(array) {
        return  (array[0][0].getValue() !== 0 && array[0][0].getValue() === array[1][1].getValue() && array[1][1].getValue() === array[2][2].getValue()) ||
            (array[0][2].getValue() !== 0 && array[0][2].getValue() === array[1][1].getValue() && array[1][1].getValue() === array[2][0].getValue());
    };

    const winCheck = () => {
        let array = gameBoard.getBoard();

        const rowWin = array.some(rowCheck);
        const columnWin = columnCheck(array);
        const diagonalWin = diagonal(array);

        return rowWin || columnWin || diagonalWin;
    };

    return {winCheck};

})();

const roundPlayer = (function(){    

    let moves = 0;

    const playRound = (player1Symbol,player2Symbol) => {

        // for Player 1

        let validMove = false;        

        while (validMove === false) {
            let x = prompt("Player 1, enter the x-coordinate:");
            let y = prompt("Player 1, enter the y-coordinate:");

            if (gameBoard.getSquareValue(x,y) === 0) {
                gameBoard.changeBoard(x, y, player1Symbol);
                validMove = true;            
            }
            else {
                alert("Square already filled. Try again.");
            }                    
        }
        gameBoard.showBoard();
        moves++;
        if(gameLogic.winCheck()){
            return player1Symbol;
        }
        else if(moves === 9){
            return moves;
        }


        // for Player 2

        validMove = false;
        while (validMove === false) {
            let i = prompt("Player 2, enter the x-coordinate:");
            let j = prompt("Player 2, enter the y-coordinate:");
            
            if (gameBoard.getSquareValue(i,j) === 0) {
                gameBoard.changeBoard(i, j, player2Symbol);
                validMove = true;            
            }
            else {
                alert("Square already filled. Try again.");
            } 
        }      
        gameBoard.showBoard();
        moves++;
        if(gameLogic.winCheck()){
            return player2Symbol;
        }      
    }
    const checkMoves = () => moves;

    return {playRound,checkMoves};
})();


const game = (function() {
    let player1 = createPlayer('Player 1','x');
    let player2 = createPlayer('Player 2','o');
    let gameEnd = false;

    const play = () => {
        while (gameEnd === false) {
            let result = roundPlayer.playRound(player1.symbol,player2.symbol);
            console.log(roundPlayer.checkMoves());
            if(result === player1.symbol || result === player2.symbol){
                gameEnd = true;
                console.log(result + ' has won');
            }
            else if(result === 9){
                gameEnd = true;
                console.log('draw');
            }

        }         
    }

    return {play} 

})();

const display =(function(){
    let array = gameBoard.getBoard();
    let body = document.querySelector('body');
    let gameBoardDiv = document.createElement('div');

    const createBoard = ()=>{
        body.appendChild(gameBoardDiv);
        gameBoardDiv.id= 'gameBoard';
        console.log(array);

        for(subArray of array){
            for(subsubArray of subArray){
                let cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.addEventListener('click',(event)=> console.log('click'))
                gameBoardDiv.appendChild(cellDiv);
                
                // cellDiv.addEventListener('click');
                // cellDiv.textContent = subsubArray.getValue();    
            }
        }

    }
    
    return {createBoard};  

    
    

})();

display.createBoard();



// game.play();

