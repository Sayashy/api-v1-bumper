
const bumperRepo = require('../repository').default;
const makeBumperController = require('./bumperController').default;

const bumperController = makeBumperController(bumperRepo);

exports.default = bumperController;