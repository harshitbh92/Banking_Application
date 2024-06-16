const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT  = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // to see a requests made in the console.
const cors = require("cors");
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dbConnect();
app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);

});