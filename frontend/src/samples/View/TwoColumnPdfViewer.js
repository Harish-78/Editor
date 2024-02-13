import React, { useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Margin, usePDF, Resolution } from "react-to-pdf";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

function TwoColumnPdfViewer() {
  const initialContent = localStorage.getItem("editorData");
  const [editorInstance, setEditorInstance] = useState(null);

  // Creates a new editor instance.
  const editor = useBlockNote({
    editable: false,
    initialContent: initialContent
      ? JSON.parse(initialContent)[0]?.content?.blocks
      : undefined,
    onEditorReady: (editor) => {
      setEditorInstance(editor);
    },
  });

  const editor1 = useBlockNote({
    editable: false,
    initialContent: initialContent
      ? JSON.parse(initialContent)[1]?.content?.blocks
      : undefined,
    onEditorReady: (editor) => {
      setEditorInstance(editor);
    },
  });

  const { toPDF, targetRef } = usePDF({
    filename: "advanced-example.pdf",
    method: "save",
    resolution: Resolution.MEDIUM,
    page: {
      margin: Margin.MEDIUM,
      format: "A4",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },

    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  return (
    <div>
      <div className="flex justify-end m-5">
        <Button
          startIcon={<DownloadIcon />}
          sx={{
            margin: "10px",
          }}
          variant="contained"
          color="info"
          onClick={() => toPDF()}
        >
          Download PDF
        </Button>
      </div>

      <div ref={targetRef}>
        <table style={{ width: "100%" }}>
          <tr>
            <td className="p-5">
              <BlockNoteView editor={editor} />
            </td>
            <td className="p-5">
              <BlockNoteView editor={editor1} />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default TwoColumnPdfViewer;
