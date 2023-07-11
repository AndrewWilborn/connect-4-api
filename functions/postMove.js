import db from "./dbConnect.js";

const coll = db.collection("game");
const docId = "P06lG9GlRfpHhhMCuTMP"

function validMove(moveCol, board){
    if(moveCol >= 7 || moveCol < 0){
        return false;
    }
    if(board[moveCol].length >= 6){
        return false;
    }
    return true;
}

function getUpdatedBoard(board, activePlayer, moveCol){
    const updatedBoard = [...board];
    updatedBoard[moveCol] += activePlayer ? "R" : "Y";
    return updatedBoard;
}

export function isWinner(board){
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

export async function submitMove(req, res){
    // Read move from req.body
    const moveCol = req.body.moveCol;
    const playerId = req.body.playerId;
    // Obtain current gamestate
    const game = await coll.get();
    const {inGame, board, activePlayer, playerIds} = game.docs[0].data();

    if(!inGame){
        res.status(401).send({ success: false, message: 'game not active'})
    }

    if(playerIds[activePlayer] !== playerId){
        res.status(401).send({ success: false, message: 'invalid playerId'})
        return;
    }

    if(!validMove(moveCol, board)){
        res.status(401).send({ success: false, message: 'invalid move'})
        return;
    }
    // If move is valid, apply it to the board
    const updatedBoard = getUpdatedBoard(board, activePlayer, moveCol)

    if(isWinner(updatedBoard)){
        await coll.doc(docId).update({"board": updatedBoard, "activePlayer": 2+activePlayer});
        res.status(200).send({ success: true, "board": updatedBoard, "isWinner": true});
    } else{
        await coll.doc(docId).update({"board": updatedBoard, "activePlayer": activePlayer?0:1});
        res.status(200).send({ success: true, "board": updatedBoard, "isWinner": false});
    }
    // await coll.doc(docId).update({"board": updatedBoard, "activePlayer": activePlayer?0:1});

    // res.status(200).send(isWinner(updatedBoard)
    //     ? { success: true, "board": updatedBoard, "isWinner": true}
    //     : { success: true, "board": updatedBoard, "isWinner": false}
    // );
}