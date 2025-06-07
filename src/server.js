require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const User = require('./services/user');
const Task = require('./services/task');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const path = require('path');
const YAML = require('yamljs');
const port = 3000

db();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", [User, Task]);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});