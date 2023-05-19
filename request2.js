// This module replaces the deprecated "request" module in npm

module.exports = function request(options,callback) {
	// Possible options :
	// url : address to call
	// json : true -- body is expected JSON, so parse it

	let url = options.url;
	let jsonFlag = options.json;

	let protocol;
	if (url.search(/https:\/\//i) != -1) { // Check if secure HTTP required
		protocol = require('https');
	} else {
		protocol = require('http');
	}

	// Set user agent header
	const protocolOptions ={
		headers : {
			"user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
		}
	}
	
	protocol.get(url, protocolOptions, function (resp) {
	  let body = "";
	  let json;

	  // A chunk of data has been received
	  resp.on('data', (chunk) => {
	    body += chunk;
	  });

	  // The whole response has been received, so send back the result
	  resp.on('end', function() {
      // Check for redirects (statusCode:302)
      if (resp.statusCode == 302) {
        request({"url": resp.headers.location, "json": options.json},callback) // Follow redirect
        return; // Stop execution of current fetch
      }

      // Check for JSON format
      if (jsonFlag) {
		  	try {
		  		json = JSON.parse(body)
		  	} catch {
		  		// variable "json" will be undefined by default, which is what we return in that case
		  	}
		  	body = json;
		  }

		  callback('',resp,body);
	  });

	}).on("error", (err) => {
	  callback("Error: " + err.message,'','')
	});
}
