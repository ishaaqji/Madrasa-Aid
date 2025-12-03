import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generatePdfReceipt(data){
  const doc = new PDFDocument({ size: 'A4' });
  const outDir = path.join(process.cwd(), 'tmp');
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const filename = `receipt-${data.receiptNo || Date.now()}.pdf`;
  const full = path.join(outDir, filename);
  const stream = fs.createWriteStream(full);
  doc.pipe(stream);

  doc.fontSize(20).text('Donation Receipt', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Receipt No: ${data.receiptNo || ''}`);
  doc.text(`Amount: ${data.amount}`);
  doc.text(`Donor: ${data.donorName || '-'}`);
  doc.text(`Madrasa ID: ${data.madrasaId || '-'}`);
  doc.text(`Date: ${data.createdAt || ''}`);
  doc.moveDown();
  doc.text('Thank you for your contribution.');

  doc.end();

  await new Promise((resolve, reject)=> stream.on('finish', resolve).on('error', reject));
  return full;
}
