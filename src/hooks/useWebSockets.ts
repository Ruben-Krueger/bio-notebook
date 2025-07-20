import { useEffect, useRef, useState } from "react";

type MessageHandler = (data: any) => void;

let ws: WebSocket | null = null;

export function useWebSocket(url: string, onMessage: MessageHandler) {
  const wsRef = useRef<WebSocket | null>(null);

  const [error, setError] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    console.log("Opening WebSocket to:", url);

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to WebSocket server");

      // Send initial message
      ws.send(JSON.stringify({ text: "Hello server!" }));

      setIsOnline(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("Received:", data);
      onMessage(data);
    };

    ws.onclose = () => {
      console.log("Connection closed");

      setIsOnline(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError(error);
    };

    // Clean up on unmount
    return () => {
      ws.close();
    };
  }, []);

  return {
    sendMessage: (msg: any) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(msg));
      } else {
        console.warn("WebSocket not open. Message not sent:", msg);
      }
    },
    isOnline,
  };
}
