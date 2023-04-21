"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.simple()),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'logs.log' }),
    ],
});
const loggerMiddleware = (req, res, next) => {
    exports.logger.info('Request received', {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        query: req.query,
    });
    const originalSend = res.send;
    res.send = function (body) {
        exports.logger.info('Response sent', {
            status: res.statusCode,
        });
        originalSend.call(this, body);
    };
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=loggerMiddleware.js.map