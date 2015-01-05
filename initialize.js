var fs = require('fs');
var mkdirp = require('mkdirp');

// Array of directories to be created
var dirs = ['public/views/articles', 'public/css', 'public/js/controllers', 'public/image',
						'public/views/aside', 'public/views/includes'];

// Array of web Server program
var wsArray = [
	"var http = require('http');\n",
	"var fs = require('fs');\n",
	"console.log('Starting');\n",
	"var host = '127.0.0.1';\n",
	"var port = '8080';\n",
	"var server = http.createServer(function(request, response) {\n",
	"  // Extra line below to make the root automatically go to index.html\n",
	"  request.url = request.url === '/' ? '/index.html': request.url;\n",
	"  console.log('Received request: ' + request.url);\n",
	"  fs.readFile('./public' + request.url, function(error, data) {\n",
	"    if (error) {\n",
	"      response.writeHead(404, {'Content-type':'text/plain'});\n",
	"      response.end('Sorry the page was not found');\n",
	"    } else {\n",
	"      response.writeHead(200, {'Content-type':'text/html'});\n",
	"      response.end(data);\n",
	"    }\n",
	"  });\n",
	"});\n",
	"\n",
	"server.listen(port, host, function() {\n",
	"  console.log('Listening ' + host + ' : ' + port);\n",
	"});"
];

// Create a variable that holds the initial index.html contents						
var strVar="";
		strVar += "<!DOCTYPE html>\n";
		strVar += "<html lang=\"en\">\n";
		strVar += "  <head>\n";
		strVar += "    <meta charset=\"UTF-8\">\n";
		strVar += "    <title>Basic Web Server<\/title>\n";
		strVar += "  <\/head>\n";
		strVar += "  <body>\n";
		strVar += "    <p>Basic Web server loaded ok<\/p>\n";
		strVar += "  <\/body>\n";
		strVar += "<\/html>\n";

var hasRun = false;

// Loop through directories array to create directory structure
dirs.forEach(function(dir) {
	mkdirp(dir, function(error) {
		if (error) console.error(error)
		else {
			console.log("Created " + dir + " ok!");
			if (!hasRun) {
				fs.writeFile('./public/index.html', strVar, function(err) {
					if (err) return console.log(err);
					console.log("index.html created");
				});
				hasRun = true;
			}
		}
	});
});

var stream = fs.createWriteStream('webserver.js', {flags: 'w'});

wsArray.forEach(function(line) {
	stream.write(line, function(err) {
		if (err) throw err;
	});
})

