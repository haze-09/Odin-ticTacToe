
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

    const resetBoard = () => {
        for(let i = 0; i < 3; i++){            
            for(let j = 0; j < 3; j++){
                array[i][j].changeValue(0);       
            }
        }

    }

    const changeBoard = (i,j,symbol) => {
        if(array[i][j].getValue() === 0){
            array[i][j].changeValue(symbol);
        };     
    };

    const getBoard = () => array;

    const getSquareValue = (i,j) => array[i][j].getValue();


    return {showBoard,changeBoard,getBoard,getSquareValue,resetBoard};

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

    const playRound = (i, j, player1, player2) => {
        let status = document.querySelector('#status')

            if (gameBoard.getSquareValue(i,j) === 0) {

                if(moves === 0 || moves % 2===0){
                    gameBoard.changeBoard(i, j, player1.symbol);
                }
                else{
                    gameBoard.changeBoard(i, j, player2.symbol);
                }
                moves++;                
                display.updateBoard();
                if(gameLogic.winCheck()){
                    if(moves % 2 !== 0){
                        status.textContent= player1.name +' won';
                    }
                    else{
                        status.textContent= player2.name +' won';
                    }                    
                    display.removeListeners();
                }
                else if(moves === 9){
                    status.textContent='Its a tie';
                    display.removeListeners();
                }
                else{
                    status.textContent='click on the board to play';
                }            
            }
            else {
                console.log('square fillled');
                status.textContent='square filled already try again';
            }                    
            gameBoard.showBoard();    
    }

    const checkMoves = () => moves;

    const resetMoves = () => moves = 0;

    return {playRound,checkMoves,resetMoves};
})();


const display =(function(){
    let array = gameBoard.getBoard();
    let body = document.querySelector('body');
    let gameBoardDiv = document.createElement('div');
    const handleCellClick = (i, j, player1, player2) => () => roundPlayer.playRound(i, j, player1, player2);
    let handlers = [];



    const createBoard = (player1,player2)=>{
        body.appendChild(gameBoardDiv);
        gameBoardDiv.id= 'gameBoard';
        console.log(array);        

        for(let i=0;i<array.length;i++){
            for(let j=0;j<array[i].length;j++){
                let cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');

                const handler = handleCellClick(i, j, player1, player2);
                cellDiv.addEventListener('click',handler);

                handlers.push({ cellDiv, handler });

                if(array[i][j].getValue()===0){
                    gameBoardDiv.appendChild(cellDiv);
                }
                else{
                    cellDiv.textContent = array[i][j].getValue();
                    gameBoardDiv.appendChild(cellDiv);
                }                    
            }
        }

    }
    const updateBoard = ()=>{
        let cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index)=>{
            let i = Math.floor(index / 3);
            let j = index % 3;

            if(array[i][j].getValue()===0){
                cell.textContent = '';
            }
            else{
                cell.textContent = array[i][j].getValue();
            }             
        })

    }

    const removeListeners = ()=>{
        handlers.forEach(({ cellDiv, handler }) => {
            cellDiv.removeEventListener('click', handler);
        });
    }

    const addListeners = () => {
        handlers.forEach(({ cellDiv, handler }) => {
            cellDiv.addEventListener('click', handler);
        });
    };

    return {createBoard, updateBoard, removeListeners, addListeners};   
    

})();

const game = (function(){
    let form = document.querySelector('form');
    let body = document.querySelector('body');

    let status = document.createElement('p');
    status.id = 'status';

    function resetActions() {        
        gameBoard.resetBoard();
        roundPlayer.resetMoves();
        status.textContent='click on the board to play';
        display.addListeners();
        display.updateBoard();        
    }

    const start = ()=>{
        form.addEventListener('submit',(e) =>{
            e.preventDefault();

            const formData = new FormData(form);
            
            form.remove();            

            let player1 = createPlayer(formData.get('player1'),'×');
            let player2 = createPlayer(formData.get('player2'),'O');

            display.createBoard(player1,player2);

            body.appendChild(status);
            
            
            let reset = document.createElement('button');
            status.textContent='click on the board to play';

            body.appendChild(reset);
            reset.textContent = 'reset';
            reset.id='reset';
            reset.addEventListener('click',resetActions)            
          
        })

    }
    return {start}

})();

game.start();

