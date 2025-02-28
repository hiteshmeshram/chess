import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./constants";
import { Chess} from "chess.js";

export class Game {
    player1: WebSocket;
    player2: WebSocket;
    moves: any
    chess: Chess;
    

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.moves = [];
        this.chess = new Chess();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'black'
            }
        }))
       
    }

    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {
        console.log('inside makeMove function')
        try {
            const validMove = this.chess.move(move);
            if (validMove) {
                this.player1.send(JSON.stringify({
                    type: MOVE,
                    payload: {
                        move: validMove
                    }
                }))
    
                this.player2.send(JSON.stringify({
                    type: MOVE,
                    payload: {
                        move: validMove
                    }
                }))
            }
        } catch(e) {
            console.log(e);
            
            return;
        }
        
       

        if (this.chess.isGameOver()) {
            if (this.chess.turn() === 'b') {
                this.player1.send(JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: "white wins"
                    }
                }))

                this.player2.send(JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: "white wins"
                    }
                }))

                return;
            } else {
                this.player1.send(JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: "black wins"
                    }
                }))

                this.player2.send(JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: "black wins"
                    }
                }))
            }
        }
    }
}