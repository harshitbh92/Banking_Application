const express = require('express');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // to see requests made in the console
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
dbConnect();

// Middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });
// Endpoint to upload document
app.post('/upload', upload.single('document'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload a document' });
    }

    res.status(200).send({
        message: 'Document uploaded successfully',
        file: req.file
    });
});

const verifyDocument = (filePath) => {
    // Placeholder logic for document verification
    // In a real-world scenario, implement actual verification logic here
    return filePath.includes('verified');
};

// Endpoint to verify document
app.post('/verify', (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).send({ message: 'File path is required' });
    }

    const isVerified = verifyDocument(filePath);

    res.status(200).send({
        message: isVerified ? 'Document is verified' : 'Document verification failed',
        verified: isVerified
    });
});

// Import and use routes
const authRouter = require('./routes/userRoute');
const applicationRouter = require('./routes/ApplicationRoutes');
const EmploymentRouter = require('./routes/EmploymentRoutes');
const LoginRouter = require('./routes/LoginRoute');
const TransactionRouter = require('./routes/TransactionRoutes');
const AccountRouter = require('./routes/AccountRoutes');

app.use('/api/user', authRouter);
app.use('/api/application',applicationRouter);
app.use('/api/application/employment',EmploymentRouter);
app.use('/api/application/login',LoginRouter);
app.use('/api/transactions',TransactionRouter);
app.use('/api',AccountRouter);


// Handle 404 errors
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
