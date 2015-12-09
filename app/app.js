var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

var homeRouter = require('./routes/homeRoutes')();

app.use('/api/home', homeRouter);


app.listen(port, function(){
    console.log('Running app on PORT: ' + port);
});

module.exports = app;
