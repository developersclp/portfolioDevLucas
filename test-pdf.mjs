import { jsPDF } from "jspdf";

const testPdf = () => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let y = margin;

  const darkBg = [24, 24, 27];
  const emerald = [52, 211, 153];
  const white = [255, 255, 255];
  const gray = [161, 161, 170];
  const darkGray = [113, 113, 122];
  const lineColor = [39, 39, 42];

  pdf.setFillColor(...darkBg);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  const checkPage = (needed) => {
    if (y + needed > pageHeight - margin) {
      pdf.addPage();
      pdf.setFillColor(...darkBg);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");
      y = margin;
    }
  };

  const writeMultiline = (text, x, maxWidth, fontSize, color, fontStyle = "normal") => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);
    pdf.setFont("helvetica", fontStyle);
    const lines = pdf.splitTextToSize(text, maxWidth);
    const lineHeight = fontSize * 0.45;
    for (const line of lines) {
      checkPage(lineHeight);
      pdf.text(line, x, y);
      y += lineHeight;
    }
    return lines.length * lineHeight;
  };

  const drawSeparator = () => {
    checkPage(20);
    y += 8;
    pdf.setDrawColor(...lineColor);
    pdf.setLineWidth(0.3);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 10;
  };

  const drawSectionTitle = (title) => {
    checkPage(12);
    pdf.setFillColor(...emerald);
    pdf.circle(margin + 2, y - 1.5, 1.5, "F");
    pdf.setFontSize(13);
    pdf.setTextColor(...white);
    pdf.setFont("helvetica", "bold");
    pdf.text(title, margin + 7, y);
    y += 7;
  };

  // test draw
  drawSeparator();
  drawSectionTitle("Test Section");

  pdf.save("test.pdf");
};

testPdf();
console.log("Success");
