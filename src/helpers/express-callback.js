const requestAdapter = require('./request-adapter').default;

const makeExpressCallback = endPoint => {
    return (req, res) => {
        const httpRequest = requestAdapter(req);
        endPoint(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                res.type('json')
                res.status(httpResponse.statusCode).send(httpResponse.data)
            })
            .catch(e => {
                console.log(e.message)
                res.status(500).send({ error: 'An unkown error occurred.' })
            })
    }
}

exports.default = makeExpressCallback