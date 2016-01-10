const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restbucks');
const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    req.requestedURI = req.protocol + "://" + req.get('host') + req.originalUrl;
    return next();
});

const homeRouter = require('./routes/homeRoutes')();
const orderRouter = require('./routes/orderRoutes')();
const paymentRouter = require('./routes/paymentRoutes')();

app.use('/api/home', homeRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);


app.listen(port, function () {
    console.log(`Running app on PORT: ${port}`);
});

module.exports = app;
