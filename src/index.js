const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();
const url = 'ws://localhost:3000';
// const url = 'ws://johnnyfive.local:3000';

client.connect(url);

client.on('connectFailed', error => onError(`Couldn't connect to ${url}.\n${error}`));
client.on('connect', connection => {
  connection.on('error', error => onError(error));
  connection.on('close', () => onDisconnect(connection));
  connection.on('message', message => onMessage(connection, message));
});

const onError = error => {
  console.error(error);
};
const onDisconnect = connection => {
  console.info('Connection Closed');
};
const onMessage = (connection, message) => {
  if (message.type === 'utf8') {
    const data = prettyStringify(message.utf8Data);
    console.debug(data);
  } else {
    console.warn('Error: Received a message but it was not in utf8 format.');
  }
};

const prettyStringify = msg => {
  return typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg;
};
