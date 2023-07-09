export function detectWinner(board){
    board.forEach(e => {
        if(e.includes("YYYY") || e.includes("RRRR")){
            return true
        }
    });
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 4; j++){
            console.log(board[j][i])
            
        }
    }
    return false;
}