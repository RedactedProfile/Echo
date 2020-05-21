const net = require('net');

const MaxConnections = 10;

const server = net.createServer(client => {
    console.log("Client Connected");

    // Close Connection
    client.on('end', () => {
        console.log('goodbye, cleaning up after the user\n');
    });

    client.on('data', (data) => {
        console.log('received something', data);
    })

    client.write('hello new user\r\n');
    client.pipe(client);
}).on('error', err => {
    throw err;
});
server.listen(8200, () => {
    console.log('opened server on', server.address());
});
