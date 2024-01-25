import React, { useEffect } from "react";
import Folder from "../components/Folder";
import controlImg from "../assets/images/control.png";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useState } from "react";
import "./Folder.css";
import useTraverseTree from "../hooks/use-traverse-tree";
import explorer from "../assets/Folder Data/folderData";
import Editor from "./EditorScreen";
import { templates } from "../assets/data/templates";
import { Card } from "@mui/material";

const FilesScreen = () => {
  const [open, setOpen] = React.useState(true);
  const [explorerData, setExplorerData] = useState(explorer);
  const [dataFromEditor, setDataFromEditor] = useState(null);

  const handleDataFromChild = (data) => {
    setDataFromEditor(data);
  };

  const dataSubmission = () => {
    setExplorerData((prevExplorerData) => ({
      ...prevExplorerData,
      data: "",
    }));
  };

  console.log(dataFromEditor);

  console.log(explorerData);

  useEffect(() => {
    dataSubmission();
  }, [dataFromEditor]);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  // console.log("Folder: ", explorerData);

  return (
    <div className="m-3 flex ">
      <div className="flex ">
        <div
          className={` ${
            open ? "md:w-72 w-40" : "md:w-20 w-20"
          } bg-white  h-screen p-5 shadow-md pt-8 relative duration-300 `}
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
              <div className="flex justify-center">
                <MdOutlineLibraryBooks className="w-5 h-5" />
                <h1
                  className={`text-dark-purple origin-left font-medium text-xl duration-200 ${
                    !open && "scale-0"
                  } relative bottom-5 left-2 `}
                >
                  Explorer
                </h1>
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
      </div>

      <div className="w-full">
        <div className="flex flex-grow m-5">
          {templates?.length
            ? templates.map((item, index) => (
                <div key={index} className="m-5">
                  <Card>
                    <img src={item?.imageUrl} alt="templates" />
                    <h1>{item?.name}</h1>
                  </Card>
                </div>
              ))
            : null}
        </div>
        <Editor onDataFromChild={handleDataFromChild} />
      </div>
    </div>
  );
};

export default FilesScreen;
