const express = require('express');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // to see requests made in the console
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

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

// Import and use routes
const authRouter = require('./routes/userRoute');
const applicationRouter = require('./routes/ApplicationRoutes');
app.use('/api/user', authRouter);
app.use('/api/application',applicationRouter);

// Handle 404 errors
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
