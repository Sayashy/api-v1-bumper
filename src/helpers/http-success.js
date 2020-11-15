const makeHttpSuccess = ({ statusCode, data }) => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode,
        data
    }
}

exports.default = makeHttpSuccess;