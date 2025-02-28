import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', function connection(ws) {
    console.log('ws connection established')
  ws.on('message', function message(data) {
    console.log('receive message')
    GameManager.getInstance().addUser(ws);
  });

  
});