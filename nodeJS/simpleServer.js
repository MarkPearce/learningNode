var net = require('net');

var mySocket;

var server = net.createServer(function(socket) {
	mySocket = socket;
	mySocket.on("connect", onConnect);
	mySocket.on("data", onData);
});

function onConnect()
{
	console.log("Connected to Flash");
}

function onData(d)
{
	if(d == "exit\0")
	{
		console.log("exit");
		mySocket.end();
		server.close();
	}
	else
	{
		console.log("From Flash = " + d);
		mySocket.write(d, 'utf8');
	}
}

server.listen(9001, "192.168.11.36");