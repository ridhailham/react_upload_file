import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// Dapatkan jalur direktori dari URL saat ini
const currentModuleUrl = new URL(import.meta.url);
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentDirPath = dirname(currentModulePath);

app.use(express.static(currentDirPath + "/public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage });



app.get('/', (req, res) => {
  res.send("Hello World");
});

app.post('/api/upload', upload.single('photo'), (req, res) => {
  let finalImageURL = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

  res.json({
    status: "success",
    image: finalImageURL
  });
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log("app is running on port " + PORT);
});






// import express from "express"
// import bodyParser from "body-parser"
// import multer from "multer"
// import cors from "cors"
// import path from "path"

// const app = express()
// const PORT = process.env.PORT || 5000

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, "public")))

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

// const upload = multer({ storage })


// app.get('/', (req, res) => {
//     res.send("Hello World")
// })

// app.post('/api/upload', upload.single('photo'), (req, res) => {
//     let finalImageURL = req.protocol + "://" + req.get("host") + "/uploads" + req.file.filename

//     res.json({
//         status: "success",
//         image: finalImageURL
//     })
// })

// app.listen(PORT, (err) => {
//     if(err) {
//         throw err
//     }

//     console.log("app is running on port " + PORT);
// })
