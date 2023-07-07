import db from "./dbConnect.js";

const coll = db.collection("game");
const docId = "P06lG9GlRfpHhhMCuTMP"

function validMove(moveCol, board){
    return true;
}

function getUpdatedBoard(board, activePlayer, moveCol){
    return board;
}

function isWinner(board){
    return false;
}

export async function submitMove(req, res){
    // Read move from req.body
    const moveCol = req.body.moveCol;
    const playerId = req.body.playerId;
    // Obtain current gamestate
    const game = await coll.get();
    const {inGame, board, activePlayer, playerIds} = game.docs[0].data();

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
    await coll.doc(docId).update({"board": updatedBoard});

    res.status(200).send(isWinner(updatedBoard)
        ? {"board": updatedBoard, "isWinner": true}
        : {"board": updatedBoard, "isWinner": false}
    );
}