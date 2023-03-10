const xss = require('xss');
module.exports = function getReqBody(body) {
    if (Array.isArray(body)) {
        const data = body.map((i) => getReqBody(i));
        return data;
    } else if (typeof body == 'object') {
        const data = {};
        for (const key of Object.keys(body)) {
            let value = body[key];
            data[key] = getReqBody(value)
        }
        return data;
    } else if (typeof body == 'number') {
        return body;
    } else if (typeof body == 'boolean') {
        return body;
    }
    return xss(body);
};