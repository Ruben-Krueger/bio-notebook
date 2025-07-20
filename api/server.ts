import WebSocket, { WebSocketServer } from "ws";
import { IncomingMessage } from "http";

// Create WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Store connected clients
const clients = new Set<WebSocket>();

// Handle new connections
wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  console.log("New client connected from:", req.socket.remoteAddress);

  // Add client to our set
  clients.add(ws);

  // Send welcome message
  ws.send(
    JSON.stringify({
      type: "welcome",
      message: "Connected to WebSocket server",
      timestamp: new Date().toISOString(),
    })
  );

  // Handle incoming messages
  ws.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);

      // Echo message back to sender
      ws.send(
        JSON.stringify({
          type: "echo",
          originalMessage: message,
          timestamp: new Date().toISOString(),
        })
      );

      // Broadcast to all other clients
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "broadcast",
              message: message,
              timestamp: new Date().toISOString(),
            })
          );
        }
      });
    } catch (error) {
      console.error("Error parsing message:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Invalid JSON format",
          timestamp: new Date().toISOString(),
        })
      );
    }
  });

  // Handle client disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clients.delete(ws);
  });
});

// Handle server errors
wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});

console.log("WebSocket server running on ws://localhost:8080");

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down WebSocket server...");
  wss.close(() => {
    console.log("WebSocket server closed");
    process.exit(0);
  });
});
