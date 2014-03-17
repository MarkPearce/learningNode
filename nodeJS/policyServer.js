var net = require("net"),
    domains = ["localhost:8081"];

net.createServer(
    function(socket)
    {
        socket.write("<?xml version=\"1.0\"?>\n");
        socket.write("<!DOCTYPE cross-domain-policy SYSTEM \"http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd\">\n");
        socket.write("<cross-domain-policy>\n");

        domains.forEach(
            function(domain)
            {
                var parts = domain.split(':');
                socket.write("<allow-access-from domain=\""+parts[0]+"\"to-ports=\""+(parts[1]||'80')+"\"/>\n");
            }
        );

        socket.write("</cross-domain-policy>\n");
        socket.end();   
    }
).listen(843);

//debugging for connection errors so server doesn't die

//socket.setEncoding("utf8");
//socket.addListener("end", function () {socket.end();});
//socket.addListener("error", function (exception) {socket.end();});
//socket.addListener("timeout", function () {socket.end();});
//socket.addListener("close", function (had_error) {socket.end();});

