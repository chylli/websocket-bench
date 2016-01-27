var logger     = require('./lib/logger.js');
module.exports = {
    /**
     * On client connection (required)
     * @param {client} client connection
     * @param {done} callback function(err) {}
     */
    onConnect : function(client, done) {

        client.onmessage = function(msg) {
            var data = JSON.parse(msg.data);
            //console.log(data);
            //logger.error('ticks update: ' + data);
        };
        client.send(JSON.stringify({ticks:'R_100'}));

        done();
    },

    /**
     * Send a message (required)
     * @param {client} client connection
     * @param {done} callback function(err) {}
     */
    sendMessage : function(client, done) {
        client.send(JSON.stringify({ping : 1}));
        done();
    },
};
