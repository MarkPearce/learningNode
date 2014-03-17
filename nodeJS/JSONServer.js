var net = require('net');
var greatjson = require('greatjson');
var util = require('util');

var result; //result of jSON parse

var mySocket;
var clients = [];

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
		//console.log("stringify d = " + JSON.stringify(d));
		//console.log(util.inspect(d, { showHidden: true, depth: null }));
		//d = d.substring(0, d.length - 1);
		  // example how to use greatjson successfully

		if (!((result = greatjson.parse(d)) instanceof Error)){

			console.log('It works! I got:', result)
			}else {
			// SyntaxError
			console.log(result.toString())
			// printout of custom error properties
			var s = []
			for (var p in result) s.push(p + ':' + result[p])
			console.log('Error properties:', s.join(' '))
		}

		//console.log("json = "+currentMessage);
		//searchHistory.splice(0,0,d);
		//mySocket.write(searchHistory.toString(),'utf8');
		//mySocket.write(d, 'utf8');
		mySocket.write(d,'utf8');
	}
}

server.listen(9001, "192.168.11.36");