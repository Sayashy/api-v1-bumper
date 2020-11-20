const express = require('express');
const bodyParser = require('body-parser');
const makeCallback = require('./src/helpers/express-callback').default
const handleOptionRequest = require('./src/helpers/option-requests').default
const bumperController = require ('./src/controllers')

const app = express();

const port = process.env.PORT || 20000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.options('/*', handleOptionRequest)

app.get("/", (req, res) => {
    res.send("Nothing here.")
})

app.post("/", makeCallback(bumperController.default))

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});
