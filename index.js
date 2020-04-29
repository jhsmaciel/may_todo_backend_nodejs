const port = process.env.PORT || 3333;
const express = require('express');
const routes = require('./src/routes');
const { errors } = require('celebrate');
const cors = require('cors')
const app = express();



app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(port);