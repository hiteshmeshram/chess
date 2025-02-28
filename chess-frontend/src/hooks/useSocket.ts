import { useEffect, useState } from "react"


const WS_URL = 'ws://localhost:8081'
export const useSocket = () => {
    const [socket,setSocket] = useState<null | WebSocket>(null);
    const [loading,setLoading ] = useState(true);

    useEffect (() => {
        const ws = new WebSocket(WS_URL)
        ws.onopen = () => {
            setSocket(ws);
            setLoading(false)
        }

        ws.onclose = () => {
            setSocket(null)
        }
        
        return () => {
            ws.close()
        }
    },[])

    return {socket, loading};
}