import React, { useState } from "react";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useData } from "../context/DataContext";
import Folder from "../components/Folder";
import aroopaImg from "../assets/images/aroopa.jpeg";
import controlImg from "../assets/images/control.png";
import { MdOutlineLibraryBooks } from "react-icons/md";
import useTraverseTree from "../hooks/use-traverse-tree";
import { useNavigate } from "react-router-dom";
import { useFolderData } from "../context/FolderDataContext";

const now = new Date().getTime();

const Editor = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const { setSharedData, folderData } = useFolderData();
  const [explorerData, setExplorerData] = useState(folderData);
  const [editorData, setEditorData] = useState({
    time: now,
    blocks: [],
  });

  React.useEffect(() => {
    setExplorerData(folderData);
    console.log("Folder data: ", folderData);
    console.log("editorData", editorData);
  }, [folderData, editorData]);

  console.log("Explorer: ", explorerData);
  const { data } = useData();

  const editor = useBlockNote({
    initialContent: data.length ? data[0]?.blocks : editorData?.blocks ?? [],
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

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
    setSharedData(finalTree);
  };

  const lastEditedTime = new Date(editorData ? editorData.time : data[1]?.time);


  

  return (
    <div className="h-full">
      <div className="flex gap-x-4 p-5 items-center">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={aroopaImg}
          className={`cursor-pointer w-7 b`}
          alt="arooopa"
        />
        <h1 className={`text-dark-purple origin-left font-medium text-xl `}>
          Aroopa Wiki
        </h1>
      </div>
      <div className="flex mx-5">
        <div
          className={` ${
            open ? "md:w-72 w-30" : "md:w-20 w-20"
          } bg-white  h-screen   p-5 shadow-md pt-8 relative duration-300 `}
        >
          <img
            src={controlImg}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            alt="mtgybh"
          />
          <div
            className={`flex ${
              open && "overflow-y-auto whitespace-nowrap"
            } gap-x-4 items-center`}
          >
            <div>
              <div className="flex justify-between">
                <div className="flex">
                  <MdOutlineLibraryBooks className="w-5 h-5" />
                  <h1
                    className={`text-dark-purple origin-left relative bottom-5 left-2 font-medium text-xl duration-200 ${
                      !open && "scale-0"
                    }  `}
                  >
                    Explorer
                  </h1>
                </div>
                {/* <div className={`duration-200 ${!open && "scale-0"}`}>
                  <IconButton
                    color="primary"
                    sx={{
                      fontSize: "15px",
                    }}
                  >
                    <BsFillFileEarmarkPlusFill />
                  </IconButton>
                </div> */}
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
          <div className="flex justify-between m-3">
            <p className="font-medium text-xl text-dark-purple m-5">
              {data[1]}
            </p>
            <p>Last Edited on : {lastEditedTime.toLocaleString()}</p>
          </div>
          <BlockNoteView editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
