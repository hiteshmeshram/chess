
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react"
import { Chessboard } from "react-chessboard";
import { MOVE } from "./Game";

export const ChessBoardComponent = ({socket, board,setBoard,chesss, fen, setFen}: {
    socket: WebSocket,
    board: any,
    setBoard: any,
    chesss: any,
    fen: any,
    setFen: any
}) => {
  
    const [game,setGame] = useState(chesss)

    function onDrop(sourceSquare: any, targetSquare: any) {
      // const newGame = new Chess()
      const move = chesss.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      })

      if (!move) return false;
      // newGame.move(result)

      setFen(chesss.fen())
      // setGame(newGame)
      

      socket.send(JSON.stringify({
        type: MOVE,
        payload: {
          move
        }
      }))

     
      return true;
      // const result =  gameCopy. move({
      //   from: sourceSquare,
      //   to: targetSquare,
      //   promotion: "q", // always promote to a queen for example simplicity
      // })

      // setGame(gameCopy)
      // const move = chess.move({
      //   from: sourceSquare,
      //   to: targetSquare,
      //   promotion: "q", // always promote to a queen for example simplicity
      // });
      // setBoard(chess.board())
      // const move = makeAMove({
      //   from: sourceSquare,
      //   to: targetSquare,
      //   promotion: "q", // always promote to a queen for example simplicity
      // });
  
      // illegal move
      // if (move === null) return false;
      
      // return true;
    }
    return <div className="text-white ">
      
        <Chessboard boardWidth={600} position={fen} onPieceDrop={onDrop}/>

    </div>
}