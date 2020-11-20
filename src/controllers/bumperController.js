const { RequiredParameterError, InvalidProprityError } = require('../helpers/errors');
const makeHttpError = require('../helpers/http-error').default;
const makeHttpSuccess = require('../helpers/http-success').default;

const makeBumperController = (bumperRepo) => {
    const handle = (httpRequest) => {
        switch (httpRequest.method) {
            case 'POST':
                return bumpPost(httpRequest);
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed`
                })
        }
    }
    return handle

    /**
     * Bump Post on forum.
     * @param {Object} httpRequest - Request Object
     * @returns {(makeHttpSuccess | makeHttpError )} 
    */
    async function bumpPost(httpRequest) {

        let { url, text } = httpRequest.body.params;

        const isValid = await bumperRepo.isValidUrl({ url })

        try {
            if (isValid) {
                const resp = await bumperRepo.bumpPost({ url, text })

                if (resp.success) {
                    return makeHttpSuccess({
                        statusCode: 200,
                        data: JSON.stringify(resp)
                    })
                }
                else {
                    return makeHttpSuccess({
                        statusCode: 200,
                        data: JSON.stringify(resp)
                    })
                }

            } else {
                return makeHttpSuccess({
                    statusCode: 200,
                    data: JSON.stringify({
                        success: false,
                        message: 'Please insert a valid URL'
                    })
                })
            }
        }
        catch (error) {
            return makeHttpError({
                errorMessage: error.message,
                statusCode: error instanceof RequiredParameterError
                    ? 400
                    : 500
            })
        }
    }

}
exports.default = makeBumperController;