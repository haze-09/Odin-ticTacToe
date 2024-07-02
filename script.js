
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
            for(let j = 0; j < 3; j++){
                
                console.log(array[i][j].getValue());        
            }
        }

    };

    return {showBoard};

})();


console.log(gameBoard.showBoard());