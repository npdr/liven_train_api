const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(PORT, (req, res) => {
    console.log(`Serve is online on port ${PORT}`);
});