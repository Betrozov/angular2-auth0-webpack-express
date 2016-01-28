'use strict';

var express = require('express');
var port = process.env.PORT || 4000;
var app = express();

require('./config')(app);
require('./models')();
require('./routes')(app);

app.listen(port, function () {
    console.log('server start on port 4000 good');
});
