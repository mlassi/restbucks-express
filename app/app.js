const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const homeRouter = require('./routes/homeRoutes')();

app.use('/api/home', homeRouter);


app.listen(port, function(){
    console.log(`Running app on PORT: ${port}`);
});

module.exports = app;
