import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { joinRequest, resetGame, getGameState } from "./fuctions.js";


const app = express();
app.use(cors());
app.use(express.json());

// routes:
app.get('/join', joinRequest);
app.get('/reset', resetGame);
app.get('/gameState', getGameState);

export const api = onRequest(app);