import db from "./dbConnect.js";

const coll = db.collection("game");

export async function joinRequest(req, res){
    const game = await coll.get();
    const inGame = game.docs[0].data()
    res.send(inGame);
}