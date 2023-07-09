export function detectWinner(board){
    for(let i = 0; i < 7; i++){
        if(board[i].includes("YYYY") || board[i].includes("RRRR")){
            return true;
        }
    }
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 6; j++){
            if(board[i][j] === 'Y' && board[i+1][j] === 'Y' && board[i+2][j] === 'Y' && board[i+3][j] === 'Y'){
                return true
            }
            if(board[i][j] === 'R' && board[i+1][j] === 'R' && board[i+2][j] === 'R' && board[i+3][j] === 'R'){
                return true
            }
        }
    }
    // detect postive slope diagonals
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === 'Y' && board[i+1][j+1] === 'Y' && board[i+2][j+2] === 'Y' && board[i+3][j+3] === 'Y'){
                return true;
            }
            if(board[i][j] === 'R' && board[i+1][j+1] === 'R' && board[i+2][j+2] === 'R' && board[i+3][j+3] === 'R'){
                return true;
            }
        }
    }
    for(let i = 0; i < 4; i++){
        for(let j = 3; j < 6; j++){
            if(board[i][j] === 'Y' && board[i+1][j-1] === 'Y' && board[i+2][j-2] === 'Y' && board[i+3][j-3] === 'Y'){
                return true;
            }
            if(board[i][j] === 'R' && board[i+1][j-1] === 'R' && board[i+2][j-2] === 'R' && board[i+3][j-3] === 'R'){
                return true;
            }
        }
    }
    
    return false;
}