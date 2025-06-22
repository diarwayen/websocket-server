const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
const threads = ['thread-1', 'thread-2', 'thread-3'];
const files = ['app.js', 'worker.js', 'service.js'];
const callers = ['doSomething', 'handleEvent', 'processData'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLog() {
  const timestamp = new Date().toISOString();
  const level = randomItem(levels);
  const thread = randomItem(threads);
  const file = randomItem(files);
  const caller = randomItem(callers);
  const message = `Random log message ${Math.floor(Math.random() * 1000)}`;
  return `${timestamp} ${level} ${thread} ${file} ${caller} "${message}"`;
}

wss.on('connection', ws => {
  const interval = setInterval(() => {
    ws.send(generateLog());
  }, 500);

  ws.on('close', () => clearInterval(interval));
});

console.log('Log generator WebSocket server running on ws://localhost:8080');