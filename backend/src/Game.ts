import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { GAME_OVER, INIT_GAME } from "./message";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
    }

    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {

        // check whose turn is this 
        if(this.board.moves.length % 2 === 0 && socket !==this.player1) {
            return;
        }

        if (this.board.moves.length % 2 === 1 && socket !== this.player2) {
            return;
        }

        try {
            this.board.move(move);
        } catch(e) {
            console.error(e)
        }

        if (this.board.isGameOver()) {
            //if game over then send client who wins 
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "b" ? "black" : "white"
                }
            }))

            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "b" ? "white" : "black"
                                }
            }))

            return;

            //add logic to send to user that its their turn 
        }
    }
}