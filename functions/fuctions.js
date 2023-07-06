import db from "./dbConnect.js";

const coll = db.collection("game");
const docId = "P06lG9GlRfpHhhMCuTMP"

export async function joinRequest(req, res){
    const game = await coll.get();
    const gameData = game.docs[0].data() // Get current data from the database
    let playerId;
    if(!gameData.inGame){ // If there isn't currently a game in progress
        playerId = Math.floor(Math.random() * 999999999) // Generate a playerId
        if(!gameData.playerIds[0]){ // update the database with the new playerId
            await coll.doc(docId).update({"playerIds": [playerId, gameData.playerIds[1]]})
        } else {
            await coll.doc(docId).update({"playerIds": [gameData.playerIds[0], playerId], "inGame": true})
        }
    } else {
        playerId = null;
    } 
    res.status(200).send({response: playerId})
}

export async function resetGame(req, res){
    const response = await coll.doc(docId).update({"playerIds": [0,0], "inGame": false, "activePlayer": 0, "board": [0,0,0,0,0,0,0]})
    res.status(200).send(response)
}