const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = express();
const path = require('node:path')
const cookieParser = require('cookie-parser');
const { router } = require('./modules/routes');

app.use(cors());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});