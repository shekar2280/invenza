import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
const PDFDocument = require('pdfkit').default;

export async function GET() {
  try {
    console.log('API route hit'); // Ensure the route is hit

    const doc = new PDFDocument();
    console.log('PDF document created');  // Log after PDF document creation

    // Define the path to save the file
    const filePath = path.join(process.cwd(), 'public', 'transactions.pdf');
    console.log('File path constructed:', filePath);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Define the font path (make sure the font file is in the correct directory)
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Helvetica.ttf');
    console.log('Font path constructed:', fontPath); // Verify font path

    if (!fs.existsSync(fontPath)) {
      console.error('Font file not found at:', fontPath);
      return NextResponse.json({ error: 'Font file not found' }, { status: 500 });
    }

    // Load the custom font
    doc.font(fontPath);  // Use the custom font

    // Add content to the PDF
    doc.text('Transactions Report', { align: 'center' });
    doc.moveDown();
    doc.text('This is an example of a generated PDF for transactions.');
    doc.end();

    // Wait until the PDF is fully written
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    return NextResponse.json({ fileUrl: '/transactions.pdf' });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
