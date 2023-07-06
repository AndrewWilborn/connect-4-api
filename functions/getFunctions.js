import db from "./dbConnect.js";

const coll = db.collection("game");
const docId = "P06lG9GlRfpHhhMCuTMP"

export async function joinRequest(req, res){
    const game = await coll.get();
    // There should be a way to get this by ID
    const { inGame, playerIds } = game.docs[0].data() // Get current data from the database
    let playerId;
    if(!inGame){ // If there isn't currently a game in progress
        playerId = Math.floor(Math.random() * 999999999) // Generate a playerId
        if(!playerIds[0]){ // update the database with the new playerId
            await coll.doc(docId).update({"playerIds": [playerId, playerIds[1]]})
        } else {
            await coll.doc(docId).update({"playerIds": [playerIds[0], playerId], "inGame": true})
        }
    } else {
        playerId = null;
    } 
    res.status(200).send({response: playerId})
}

export async function resetGame(req, res){
    const response = await coll.doc(docId).update({
        "playerIds": [0,0], 
        "inGame": false, 
        "activePlayer": 0, 
        "board": ["","","","","","",""]
    });
    res.status(200).send(response);
}

export async function getGameState(req, res){
    const game = await coll.get();
    const {inGame, board, activePlayer} = game.docs[0].data();
    res.status(200).send({"inGame": inGame, "activePlayer": activePlayer, "board": board});
}