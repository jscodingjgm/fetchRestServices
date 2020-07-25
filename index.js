const express = require('express');
const app = express();

const employeeRoute = require('./routes/route');

app.use('/', employeeRoute);

app.listen(3000);