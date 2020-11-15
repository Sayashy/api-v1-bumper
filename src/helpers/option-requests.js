exports.default = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
        return;
    }
    next();
}