import { useState } from "react"
import { ChessBoard } from "./ChessBoard"

export const Game = () => {
    const [ started,setStarted ] = useState(false)
    return <div className="grid grid-cols-12 pt-12">
        <div className="col-span-8 text-white flex justify-center">
           
            <ChessBoard/>
        </div>
        <div className="col-span-4 text-white">
            {!started && <button className="bg-green-500 px-28 py-3 rounded-md text-xl font-bold" onClick={()=>{
                setStarted(true)
            }}>play</button>}

            <div className="mt-5">
                moves
            </div>
        </div>
    </div>
}