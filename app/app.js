const express = require('express');
const app = express();

app.get('app/v1/hello', (req,res) => {
    res.json("message","Hello World!")
})

const port = process.env.PORT || 3000;
listen(port);
console.log("Listen on port:"+port)