// import React, { useState } from "react";
// import { BlockNoteView, useBlockNote } from "@blocknote/react";
// import "@blocknote/react/style.css";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import { useRef } from "react";
// import { Button } from "@mui/material";

// import "./styles2.css";
// import RGL, { WidthProvider } from "react-grid-layout";

// const ReactGridLayout = WidthProvider(RGL);
// function PreviewPage() {
//   const initialContent = localStorage.getItem("editorData");
//   console.log(initialContent);
//   console.log(JSON.parse(initialContent));
//   const [editorInstance, setEditorInstance] = useState(null);
//   const pdfWidth = 210; // A4 width in millimeters
//   const pdfHeight = 297; // A4 height in millimeters
//   const pdfRef = useRef();
//   const downloadPDF = () => {
//     const input = pdfRef.current;
//     html2canvas(input, { allowTaint: true, useCORS: true }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/jpeg/png");
//       const pdf = new jsPDF({
//         orientation: "portrait", // Portrait orientation
//         unit: "mm", // Measurement unit in millimeters
//         format: [pdfWidth, pdfHeight], // A4 paper format
//       });
//       // const pdfWidth = pdf.internal.pageSize.getWidth();
//       // const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//       const imgX = (pdfWidth - imgWidth * ratio) / 2;
//       const imgY = 30;
//       pdf.addImage(
//         imgData,
//         "image/PNG",
//         imgX,
//         imgY,
//         imgWidth * ratio,
//         imgHeight * ratio
//       );
//       pdf.save("Component.pdf");
//     });
//   };

//   // Creates a new editor instance.
//   const editor = useBlockNote({
//     editable: false,
//     initialContent: initialContent
//       ? JSON.parse(initialContent)[0]?.content?.blocks
//       : undefined,

//     onEditorReady: (editor) => {
//       setEditorInstance(editor);
//     },
//   });
//   console.log(JSON.parse(initialContent)[0].content.blocks);
//   const editor1 = useBlockNote({
//     editable: false,
//     initialContent: initialContent
//       ? JSON.parse(initialContent)[1]?.content?.blocks
//       : undefined,
//     onEditorReady: (editor) => {
//       setEditorInstance(editor);
//     },
//   });

//   const [layout, setLayout] = useState(generateLayout());
//   const [editorDataArray, setEditorDataArray] = useState([]);

//   const defaultProps = {
//     isDraggable: false,
//     isResizable: false,
//     className: "layout",
//     items: 2,
//     rowHeight: 30,
//     cols: 2,
//   };

//   React.useEffect(() => {
//     console.log("Layout 2 :", editorDataArray);
//   }, [editorDataArray]);

//   function generateLayout() {
//     return [
//       { x: 0, y: 0, w: 1, h: 13, i: "1" },
//       { x: 1, y: 0, w: 1, h: 13, i: "2" },
//     ];
//   }

//   function onLayoutChange(layout) {
//     setLayout(layout);
//   }

//   return (
//     <>
//       <div className="flex justify-end">
//         <Button
//           variant="contained"
//           sx={{ margin: "20px" }}
//           onClick={downloadPDF}
//         >
//           Download PDF
//         </Button>
//       </div>
//       <Document>
//         <Page>
//           <div ref={pdfRef}>
//             <ReactGridLayout
//               layout={layout}
//               onLayoutChange={onLayoutChange}
//               {...defaultProps}
//             >
//               <span key={"1"} className="grid">
//                 <BlockNoteView layout={"1"} editor={editor} />
//               </span>
//               <span key={"2"} className="grid">
//                 <BlockNoteView layout={"2"} editor={editor1} />
//               </span>
//             </ReactGridLayout>
//           </div>
//         </Page>
//       </Document>
//     </>
//   );
// }
// export default PreviewPage;
