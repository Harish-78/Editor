import React, { useState, useEffect } from "react";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import Folder from "../components/Folder";
import aroopaImg from "../assets/images/aroopa.jpeg";
import controlImg from "../assets/images/control.png";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useFolderData } from "../context/FolderDataContext";
import useTraverseTree from "../hooks/use-traverse-tree";
import instance from "../axios/axios";

const Editor = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { setSharedData, folderData } = useFolderData();
  const [explorerData, setExplorerData] = useState(folderData);

  const [editorData, setEditorData] = useState(folderData);

const d =[
  {
    id: "newsBlock1",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "center",
      level: 1,
    },
    content: [
      {
        type: "text",
        text: "Breaking News",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "newsBlock2",
    type: "image",
    props: {
      imageUrl: "https://placeholder.com/800x400",
      altText: "News Image",
    },
    content: [],
    children: [],
  },
  {
    id: "newsBlock3",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "In a surprising turn of events, ",
        styles: {},
      },
      {
        type: "text",
        text: "this news article",
        styles: {},
      },
      {
        type: "text",
        text: " unveils groundbreaking information.",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "newsBlock4",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "newsBlock5",
    type: "image",
    props: {
      imageUrl: "https://placeholder.com/800x600",
      altText: "News Image 2",
    },
    content: [],
    children: [],
  },
  {
    id: "newsBlock6",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "Stay tuned for more updates on this developing story.",
        styles: {},
      },
    ],
    children: [],
  },
]


  
  React.useEffect(() => {
    setExplorerData(folderData);
    console.log(folderData);
  }, [folderData, editorData]);
console.log(editorData);
  const editor = useBlockNote({
    initialContent: d ,
    onEditorContentChange: (editor) => {
      
      setEditorData({
        time: Date.now(), 
        blocks: editor.topLevelBlocks,
      });
    },
    onEditorReady: (editor) => {
      editor.domElement?.focus();
    },
  });

  useEffect(() => {
    setExplorerData(folderData);
  }, [folderData]);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
    setSharedData(finalTree);
  };

  return (
    <div className="h-full">
      <div className="flex gap-x-4 p-5 items-center">
        <img
          onClick={() => navigate("/")}
          src={aroopaImg}
          className="cursor-pointer w-7"
          alt="Aroopa"
        />
        <h1 className="text-dark-purple font-medium text-xl">Aroopa Wiki</h1>
      </div>
      <div className="flex mx-5">
        <div
          className={`${
            open ? "md:w-72 w-30" : "md:w-20 w-20"
          } bg-white h-screen p-5 shadow-md pt-8 relative duration-300`}
        >
          <img
            src={controlImg}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
            alt="Control"
          />
          <div
            className={`${
              open && "overflow-y-auto whitespace-nowrap"
            } flex gap-x-4 items-center`}
          >
            <div>
              <div className="flex justify-between">
                <div className="flex">
                  <MdOutlineLibraryBooks className="w-5 h-5" />
                  <h1
                    className={`text-dark-purple origin-left relative bottom-5 left-2 font-medium text-xl duration-200 ${
                      !open && "scale-0"
                    }`}
                  >
                    Explorer
                  </h1>
                </div>
              </div>
              {open && (
                <div>
                  <Folder
                    handleInsertNode={handleInsertNode}
                    explorer={explorerData}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ml-4 w-[90%]">
          <div className="flex justify-between m-3"></div>
          <BlockNoteView editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
