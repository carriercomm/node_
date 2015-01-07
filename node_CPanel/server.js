﻿var AS = require('./AutServer');
var port = process.env.port || 1337;

var server = new AS.AutServer();
server.createServer(false);

var onApplicationStoped = function () {
    process.stdout.write('FROM_APP_STOPPED\n');
};
var onApplicationStarted = function () {
    process.stdout.write('FROM_APP_STARTED\n');
};

process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (!chunk)
        return;
    chunk = chunk.trim();
    switch (chunk) {
        case 'stopapplication':
            process.stdout.write('FROM_APP_STOPPING\n');
            server.close();
            setTimeout(onApplicationStoped, 2000);
            break;
        case 'exitprocess':
            process.stdout.write('FROM_APP_EXITING\n');
            process.exit();
            break;
        case 'startapplication':
            server.createServer(false);
            setTimeout(onApplicationStarted, 2000);
            break;
        case 'hello':
            process.stdout.write('FROM_APPLICATION_HELLO\n');
            break;
    }
});
//# sourceMappingURL=server.js.map
