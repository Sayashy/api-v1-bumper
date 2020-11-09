const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const port = process.env.PORT || 20000

app.get("/", (req, res) => {
    const response = {}
    response.error = false
    response.message = "Here's your data bro"
    res.send(response)
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});
