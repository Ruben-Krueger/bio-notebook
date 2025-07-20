"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { createEditor, KEY_DOWN_COMMAND, COMMAND_PRIORITY_HIGH } from "lexical";
import { useEffect } from "react";

const theme = {
  root: "outline-none border-2 border-gray-200 rounded-lg p-4 min-h-[200px] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200 outline-none",
  paragraph: "mb-2",
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: unknown) {
  console.error(error);
}

const editorConfig = {
  namespace: "Notebook",
  theme,
  onError,
};

export default function Editor() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSave = () => {
    console.log("Document saved!");
    // Save to indexedDB or service worker if online
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            aria-placeholder={"Find your next discovery..."}
            className=""
            placeholder={
              <div>
                <p>Find your next discovery...</p>
              </div>
            }
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}
