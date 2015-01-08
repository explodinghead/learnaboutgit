var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function(request, response) {
	console.log('request starting...');
	console.log('request.url:' + request.url);

	var filePath = './public' + request.url;
	if (filePath == './public/')
		filePath = './public/index.html';

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch(extname) {
		case '.js':
						contentType = 'text/javascript';
						break;
		case '.css':
						contentType = 'text/css';
						break;
	}

	path.exists(filePath, function(exists) {
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				} else {
					response.writeHead(200, {'Content-Type': contentType});
					response.end(content, 'utf-8');
				}
			});
		}	else {
				response.writeHead(404);
				response.end();
		}
	});
}).listen(8080);
console.log('Server running at http://localhost:8080');