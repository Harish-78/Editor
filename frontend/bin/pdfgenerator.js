
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { Button } from "@mui/material";
export default function App() {
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Component.pdf");
    });
  };
  return (
    <div>
      <div ref={pdfRef}>
        <p>PDF generator</p>
      </div>
      <Button onClick={downloadPDF}>Download PDF</Button>
    </div>
  );
}
