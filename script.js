

const cell = function(){
    let value = 0;

    const changeValue = (playerValue) =>{
        if(value ==='X'||'O'){
            value = value;
        }
        else{
            value = playerValue;
        };
    };

    const getValue = () => value;

    return {value,changeValue,getValue};

};



const gameboard = (function(){
    let board = []
    for(let i = 0; i < 3; i++){
        board[i]=[];
        for(let j = 0; j < 3; j++){
            board[i].push(cell());
        };
    };
    return board;
})();


const player = function(name,symbol){
    return {name,symbol}
};

const gamePlay = function(){
    let player1 = player('player 1','X');
    let player2 = player('player 2','O');


}


console.log(gameboard);





