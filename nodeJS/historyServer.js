var net = require('net');
var greatjson = require('greatjson');
var result,error;

var mySocket;
var searchHistory = new Array();

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

		searchHistory.push(d);
		//var returnHistory = JSON.stringify(d);
		returnHistory = searchHistory.toString();
		console.log("returnHistory "+returnHistory);
		//mySocket.write(searchHistory.toString(),'utf8');
		//mySocket.write(d, 'utf8');
		mySocket.write(returnHistory,'utf8');
	}
}

server.listen(9001, "192.168.11.36");