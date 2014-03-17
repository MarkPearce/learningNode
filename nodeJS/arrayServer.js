var net = require('net');
var greatjson = require('greatjson');
var util = require('util');
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

function onData(d) //d is a buffer
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
		console.log("Buffer.isBuffer(d): "+Buffer.isBuffer(d));
		var bufferString = d.toString('utf-8')
		console.log("bufferString.isBuffer(d): "+Buffer.isBuffer(bufferString));
		console.log("bufferString = " + bufferString);
		bufferString = bufferString.substring(0, bufferString.length - 1);
		  // example how to use greatjson successfully

		if (!((result = greatjson.parse(bufferString)) instanceof Error)){

			console.log('It works! I got:', result)
			}else {
			// SyntaxError
			console.log(result.toString())
			// printout of custom error properties
			var s = []
			for (var p in result) s.push(p + ':' + result[p])
			console.log('Error properties:', s.join(' '))
		}
		console.log("result.messageType: "+result.messageType);
		
		searchHistory.push(result.messageType);
		var TextOutput = searchHistory.toString() + "\u0000";
		//var TextOutput = JSON.stringify(searchHistory).toString();
		console.log("TextOutput: "+TextOutput);
		
		//console.log("json = "+currentMessage);
		
		mySocket.write(TextOutput,'utf8');
		//mySocket.write(d, 'utf8');
		//mySocket.write(JSON.stringify(result),'utf8');
		
	}
}

server.listen(9001, "192.168.11.36");