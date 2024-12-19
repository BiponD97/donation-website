// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/uploads');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = files.file;
    const newPath = path.join(form.uploadDir, file.name);
    
    fs.rename(file.path, newPath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ 
        fileName: file.name,
        filePath: `/uploads/${file.name}` 
      });
    });
  });
}