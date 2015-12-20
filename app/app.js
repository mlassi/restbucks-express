const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restbucks');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const homeRouter = require('./routes/homeRoutes')();
const orderRouter = require('./routes/orderRoutes')();

app.use('/api/home', homeRouter);
app.use('/api/order', orderRouter);


app.listen(port, function(){
    console.log(`Running app on PORT: ${port}`);
});

module.exports = app;
