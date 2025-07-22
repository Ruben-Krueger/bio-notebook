"use client";

import React, { JSX } from "react";
import Editor from "@/components/editor";
import { useWebSocket } from "@/hooks/useWebSockets";

export default function Notebook(): JSX.Element {
  const onMessage = () => {};

  const URL = "ws://localhost:8080";

  const { sendMessage, isOnline } = useWebSocket(URL, onMessage);

  return (
    <div className="p-8">
      <h1 className="text-blue-300 ">Notebook</h1>
      <p>{isOnline ? "Connected" : "Offline"}</p>
      <div className="">
        <Editor />
      </div>
    </div>
  );
}
