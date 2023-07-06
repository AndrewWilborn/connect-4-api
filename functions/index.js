import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { joinRequest, resetGame, getGameState } from "./getFunctions.js";
import { submitMove } from "./postMove.js";

const app = express();
app.use(cors());
app.use(express.json());

// routes:
app.get('/join', joinRequest);
app.get('/reset', resetGame);
app.get('/gameState', getGameState);
app.patch('/move', submitMove);

export const api = onRequest(app);