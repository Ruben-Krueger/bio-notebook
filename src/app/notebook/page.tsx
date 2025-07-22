"use client";

import React, { JSX } from "react";
import Editor from "@/components/editor";
import { useWebSocket } from "@/hooks/useWebSockets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Notebook(): JSX.Element {
  const onMessage = () => {};

  const URL = "ws://localhost:8080";

  const { sendMessage, isOnline } = useWebSocket(URL, onMessage);

  return (
    <div className="p-8">
      <h1 className="text-blue-300 ">Notebook</h1>
      <p>{isOnline ? "Connected" : "Offline"}</p>
      <Alert variant="destructive">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
      <div className="">
        <Editor />
      </div>
    </div>
  );
}
