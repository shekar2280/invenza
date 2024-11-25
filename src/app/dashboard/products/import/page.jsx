import nextConnect from 'next-connect';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import { connectToDB } from '@/app/lib/utils';

const upload = multer({
  dest: 'uploads/',
});

const apiRoute = nextConnect({
  onError: (err, req, res) => {
    console.error('API Error:', err);
    res.status(500).json({ error: `Something went wrong: ${err.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  try {
    console.log('File uploaded:', req.file);
    await connectToDB();

    const filePath = req.file.path;
    if (req.file.mimetype !== 'text/csv') {
      fs.unlinkSync(filePath);
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
        fs.unlinkSync(filePath);
        res.status(200).json({
          message: 'File processed successfully',
          data: results,
        });
      })
      .on('error', (error) => {
        console.error('Error processing CSV:', error);
        res.status(500).json({ error: 'Error processing the CSV file.' });
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
