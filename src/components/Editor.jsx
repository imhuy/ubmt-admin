// components/Editor.js
"use client"; // only in App Router

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: "http://localhost:8008/uploadFile", // Your backend file upload endpoint
                byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by URL
              },
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 2,
            },
          },
          quote: Quote,
          embed: Embed,
        },
        data: {
          blocks: [
            {
              type: "header",
              data: {
                text: "Hello from Editor.js in React!",
                level: 2,
              },
            },
          ],
        },
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className=' text-black p-4'>
      <div id='editorjs' />
    </div>
  );
};

export default Editor;
