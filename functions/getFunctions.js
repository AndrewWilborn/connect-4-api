import db from "./dbConnect.js";

const coll = db.collection("game");
const docId = "P06lG9GlRfpHhhMCuTMP"

export async function joinRequest(req, res){
    const game = await coll.get();
    // There should be a way to get this by ID
    let { inGame, playerIds, lastPing } = game.docs[0].data() // Get current data from the database
    let playerId = null;
    let player0or1 = null;
    const time = Date.now();
    const mostRecentPing = lastPing.reduce((a, b) => Math.max(a, b), -Infinity)
    if(time - mostRecentPing > 10000) {
        await coll.doc(docId).update({
            "playerIds": [0,0], 
            "inGame": false, 
            "activePlayer": 0, 
            "board": ["","","","","","",""]
        });
        inGame=false;
        playerIds=[0,0];
    }
    if(!inGame){ // If there isn't currently a game in progress
        playerId = Math.floor(Math.random() * 999999999) // Generate a playerId
        if(!playerIds[0]){ // update the database with the new playerId
            await coll.doc(docId).update({"playerIds": [playerId, playerIds[1]], lastPing: [time, lastPing[1]]})
            player0or1 = 0;
        } else {
            await coll.doc(docId).update({"playerIds": [playerIds[0], playerId], lastPing: [lastPing[0], time], "inGame": true})
            player0or1 = 1;
        }
    } else {
        playerId = null;
        whichPlayer = 2;
    } 
    res.status(200).send({response: playerId, whichPlayer: player0or1})
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
    const { whichPlayer } = req.params
    console.log(whichPlayer)
    const game = await coll.get();
    const {inGame, board, activePlayer, lastPing} = game.docs[0].data();
    const time = Date.now();
    if(whichPlayer == 0){ // Use loose equality because we expect whichPlayer to be a string
        if(time - 5000 > lastPing[1] && inGame){
            await coll.doc(docId).update({"lastPing": [time, lastPing[1]], "activePlayer": 4})
        } else{
            await coll.doc(docId).update({"lastPing": [time, lastPing[1]]})
        }
    } else if(whichPlayer == 1) {
        if(time - 5000 > lastPing[0] && inGame){
            await coll.doc(docId).update({"lastPing": [lastPing[0], time], "activePlayer": 4})
        } else{
            await coll.doc(docId).update({"lastPing": [lastPing[0], time]})
        }
    }
    res.status(200).send({"inGame": inGame, "activePlayer": activePlayer, "board": board});
}