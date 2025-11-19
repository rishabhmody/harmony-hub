// ws-server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("🔌 WebSocket Server running at ws://localhost:8080");

let xpBase = 12000;

// Dummy initial data
let leaderboard = [
  { id: 1, name: "Kirtam Chetiala", books: 58, xp: 12740 },
  { id: 2, name: "Jagdish Choudhary", books: 39, xp: 11200 },
  { id: 3, name: "Prakriti Gupta", books: 28, xp: 10350 },
  { id: 4, name: "Atharv Arekar", books: 18, xp: 9800 },
  { id: 5, name: "Alan Saldanha", books: 13, xp: 9200 },
];

// Send updates every 3 seconds
setInterval(() => {
  // Simulate XP gaining
  leaderboard = leaderboard.map((u) => ({
    ...u,
    xp: u.xp + Math.floor(Math.random() * 40),
  }));

  // Sort by XP descending
  leaderboard.sort((a, b) => b.xp - a.xp);

  const payload = JSON.stringify({
    type: "leaderboard-update",
    leaderboard,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });

}, 3000);
