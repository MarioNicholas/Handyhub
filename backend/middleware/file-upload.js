const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path")

const MIME_TYPE = {
  "image/png" : "png",
  "image/jpeg" : "jpeg",
  "image/jpg" : "jpg",
}

const imagePath = path.join(__dirname, "../images");

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE[file.mimetype];
    cb(null, `${Date.now()}-${uuidv4()}.${ext}`);
},
})

const fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000
  },
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE[file.mimetype];
    console.log(file)
    let error = isValid ? null : new Error("Invalid mime type")
    cb(error, isValid)
  }
})

module.exports = fileUpload;

// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import path from 'path';

// const app = express();

// app.use(cors());
// app.use(express.json());

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, 'uploads'));
//     },
    // filename: (req, file, cb) => {
    //     cb(null, `${Date.now()}-${file.originalname}`);
    // },
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('photo'), (req: Request, res: Response) => {
//     try {
//         res.status(200).json({ message: 'File uploaded successfully', file: req.file });
//     } catch (error) {
//         res.status(400).json({ message: 'Failed to upload file', error });
//     }
// });

// const PORT = 8000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });