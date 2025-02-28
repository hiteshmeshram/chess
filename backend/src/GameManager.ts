import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./constants";

export class GameManager {
    private games: Game[];
    private static instance: GameManager;
    private pendingUser: WebSocket | null;
    private users: WebSocket[] = []

    constructor() {
        this.games = [];
        this.pendingUser = null;
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new GameManager();
            return this.instance;
        } 

        return this.instance;
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket)
    } 

    addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            const parsedData = JSON.parse(data.toString());
            console.log(parsedData)
            if (parsedData.type === INIT_GAME ) {
                console.log('inside init handler')
                if (this.pendingUser) {
                    const game = new Game(this.pendingUser, socket);
                    console.log('game initiated'+ game)
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = null;
                    console.log('pendign user is null')
                }
            }

            if (parsedData.type === MOVE) {
                //find the game and make a move
                console.log('inside make move')
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket); 
                console.log(game + 'gameeee')
                if (game) {
                    game.makeMove(socket, parsedData.payload.move)
                }
            }
        })
    }
}