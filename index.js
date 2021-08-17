const express = require('express');
const dbSetup = require('./db/db-setup');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

dbSetup();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server is online on port ${PORT}`);
});