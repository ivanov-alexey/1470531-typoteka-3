'use strict';

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), `src`, `frontend`, `public`, `img`));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + `-` + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

module.exports = upload;
