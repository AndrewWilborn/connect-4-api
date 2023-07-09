export function detectWinner(board){
    const isRY = (char) => {
        if(char === 'R' || char === 'Y'){
            return true;
        }
        return false;
    }
    for(let i = 0; i < 7; i++){
        if(board[i].includes("YYYY") || board[i].includes("RRRR")){
            return true;
        }
    }
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 6; j++){
            if(isRY(board[i][j]) && isRY(board[i+1][j]) && isRY(board[i+2][j]) && isRY(board[i+3][j])){
                return true
            }
        }
    }
    return false;
}