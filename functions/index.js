import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { joinRequest, resetGame } from "./fuctions.js";


const app = express();
app.use(cors());
app.use(express.json());

// routes:
// app.get('/function/:arg1/:arg2/:arg3', getFunction)
app.get('/join', joinRequest)
app.get('/reset', resetGame);

export const api = onRequest(app);