import nextConnect from 'next-connect';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import { connectToDB } from '@/app/lib/utils';

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/', // Temporary folder to store uploaded files
});

// Helper function to convert dd/mm/yyyy to yyyy-mm-dd
const convertDateFormat = (dateString) => {
  try {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`; // Return the date in yyyy-mm-dd format
  } catch (error) {
    console.error('Error converting date format:', error);
    return dateString; // Return original date string if there's an error
  }
};

// Create an instance of nextConnect
const apiRoute = nextConnect({
  onError: (err, req, res) => {
    console.error('API Error:', err); // Log the error
    res.status(500).json({ error: `Something went wrong: ${err.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

// Use multer middleware to handle file uploads
apiRoute.use(upload.single('file'));

// Handle POST request to process CSV file
apiRoute.post(async (req, res) => {
  try {
    console.log('POST /api/import-csv called');
    console.log('Uploaded file details:', req.file);

    // Connect to the database
    await connectToDB();
    console.log('Database connected.');

    const filePath = req.file?.path;
    if (!filePath) {
      console.error('File not found in request.');
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    if (req.file.mimetype !== 'text/csv') {
      fs.unlinkSync(filePath); // Delete invalid files
      return res.status(400).json({ error: 'Please upload a valid CSV file.' });
    }

    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        if (data['Expiry Date']) {
          data['Expiry Date'] = convertDateFormat(data['Expiry Date']);
        }
        results.push(data);
      })
      .on('end', () => {
        fs.unlinkSync(filePath); // Clean up the temporary file
        res.status(200).json({
          message: 'File processed successfully',
          data: results,
        });
      })
      .on('error', (error) => {
        console.error('Error while parsing CSV:', error);
        res.status(500).json({ error: 'Error processing the CSV file.' });
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});

export default apiRoute;

// Disable Next.js default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
