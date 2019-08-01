const fs = require('fs');
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();
const url = 'ws://johnnyfive.local:3000';
// const url = 'ws://localhost:3000';

client.connect(url);
client.on('connect', connection => {
  connection.on('error', error => onError(connection, error));
  connection.on('close', () => onDisconnect(connection));
  connection.on('message', message => onMessage(connection, message));
});

const onError = (connection, error) => {
  console.log(error);
};
const onDisconnect = connection => {
  console.log('Connection Closed');
};
const onMessage = (connection, message) => {
  if (message.type === 'utf8') {
    console.log(`Received:${message.utf8Data}`);
  } else {
    console.log('Error: Received a message but it was not in utf8 format.');
  }
};
