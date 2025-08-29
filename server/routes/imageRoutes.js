const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getGFS } = require('../gridfs');
const mongoose = require('mongoose');

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload an image
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const gfs = getGFS();
    if (!gfs) return res.status(500).send('GridFS not initialized');

    const writeStream = gfs.createWriteStream({
      filename: req.file.originalname,
      content_type: req.file.mimetype
    });

    writeStream.write(req.file.buffer);
    writeStream.end();

    writeStream.on('close', (file) => {
      res.json({ fileId: file._id, filename: file.filename });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get an image by id
router.get('/:id', async (req, res) => {
  try {
    const gfs = getGFS();
    const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.status(404).send('File not found');

    const readStream = gfs.createReadStream({ _id: file._id });
    res.set('Content-Type', file.contentType);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
