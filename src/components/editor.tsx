"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  createEditor,
  KEY_DOWN_COMMAND,
  COMMAND_PRIORITY_HIGH,
  $getRoot,
  EditorState,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {
  root: "outline-none border-2 border-gray-200 rounded-lg p-4 min-h-[200px] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200 outline-none",
  paragraph: "mb-2",
};

function onError(error: unknown) {
  console.error(error);
}

function MyOnChangePlugin({
  onChange,
}: {
  onChange: (state: EditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

const editorConfig = {
  namespace: "Notebook",
  theme,
  onError,
};

export default function Editor({}: {}) {
  const [editorState, setEditorState] = useState<EditorState>();

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
  const onChange = (state: EditorState) => {
    console.log("on change", state);

    const editorStateJSON = state.toJSON();

    console.log(editorStateJSON);

    setEditorState(JSON.stringify(editorStateJSON));
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
      <MyOnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
