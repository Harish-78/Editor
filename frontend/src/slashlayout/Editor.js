import { getDefaultReactSlashMenuItems } from "@blocknote/react";
import { uploadToTmpFilesDotOrg_DEV_ONLY } from "@blocknote/core";
import "@blocknote/react/style.css";
import { useBlockNote, BlockNoteView } from "@blocknote/react";

import { HiOutlineGlobeAlt } from "react-icons/hi";
import { gridTemplates } from "../samples/grids/gridTemplates";

const insertLayout = (editor, layout) => {
  const currentBlock = editor.getTextCursorPosition().block;

  const layoutBlock = {
    type: "layout",
    content: layout,
  };

  editor.insertBlocks([layoutBlock], currentBlock, "after");
};

const layoutInsertionItems = gridTemplates.map((layout, index) => ({
  name: layout.name,
  execute: (editor) => insertLayout(editor, layout),
  aliases: [layout.name.toLowerCase().replace(/\s/g, "")],
  group: "Layouts",
  icon: <HiOutlineGlobeAlt size={18} />,
  hint: `Used to insert ${layout.name} layout.`,
}));

const customSlashMenuItemList = [
  ...getDefaultReactSlashMenuItems(),
  ...layoutInsertionItems,
];

export default function App() {
  // Creates a new editor instance.
  const editor = useBlockNote({
    slashMenuItems: customSlashMenuItemList,
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
  });

  // Renders the editor instance.
  return <BlockNoteView editor={editor} theme={"light"} />;
}
