
const redis = require('redis');
const client = redis.createClient();

async function init() {
    await client.connect();

    console.log('Connected to Redis');

    client.on('error', (err) => {
        console.log(err);
    });
};

module.exports = {
    init,
    client,
}