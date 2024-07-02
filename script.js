
function createPlayer(name,symbol){
    return(name,symbol);
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
        }
    }

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

    return {showBoard};

})();


console.log(gameBoard.showBoard());