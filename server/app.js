const express = require('express');
const routes = require('./routes/');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
const path = require('path');

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogsite';
const PORT = 2715 || process.env.PORT;

cloudinary.config({
    cloud_name: 'dcf75gz8i',
    api_key: '486197397761824',
    api_secret: 'M1fU-skxJPmh1grTl-UDOeWBEB4'
})

try {
    mongoose.connect(url, {useNewUrlParser: true});
    console.log('Mongo Connected!');
} catch (error) {
    console.log('MongoDB failed to connect');
}

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use(express.static(`${__dirname}/../public`));

app.use('/api', router);

app.get('/', (req, res) => {
    res.sendFile(path.resolve)(`${__dirname}/../public/index.html`)
})


app.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}`);
})