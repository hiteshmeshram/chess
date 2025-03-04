import { useEffect, useState } from "react"
import {  ChessBoardComponent } from "./ChessBoardComponent"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";



export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = 'game_over';

export const Game = () => {
    const [ started, setStarted ] = useState(false)
    const { loading, socket } = useSocket();
    const [ chess, setChess ] = useState(new Chess());
    const [ board, setBoard ] = useState(chess.board())
    const [fen,setFen] = useState(chess.fen())
    const [moves,setMoves] = useState<any>([])

    useEffect( ()=> {
        if(!socket) return;

        socket.onmessage = (event)=> {
            const message = JSON.parse(event.toString());

            switch(message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true)
                    setFen(chess.fen())
                    console.log("message from server" + message)
                    break;
                case MOVE: 
                    const move = message.payload.move;
                    console.log(move)
                    chess.move(move);
                    setBoard(chess.board())
                    setFen(chess.fen())
                    setMoves([...moves,move])
                    break;
                case GAME_OVER:
                    console.log('game over')
                    break;
            }
        }
    },[socket])

    if (loading && !socket) {
        return <div>
            connecting to ws server
        </div>
    }
    return <div className="grid grid-cols-12 pt-12">
        <div className="col-span-8 text-white flex justify-center">
           
            <ChessBoardComponent socket={socket as WebSocket} fen={fen}setFen={setFen} board={board} setBoard={setBoard} chesss={chess} />
        </div>
        <div className="col-span-4 text-white">
            {!started && <button className="bg-green-500 px-28 py-3 rounded-md text-xl font-bold" onClick={()=>{
                socket?.send(JSON.stringify({
                    type: INIT_GAME,

                }))
                // setStarted(true)
            }}>play</button>}

            <div className="mt-5">
                {JSON.stringify(moves)}
            </div>
        </div>
    </div>
}