// This module replaces the deprecated "request" module in npm

module.exports = function (options,callback) {
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


	protocol.get(url, function (resp) {
	  let body = "";
	  let json;

	  // A chunk of data has been received
	  resp.on('data', (chunk) => {
	    body += chunk;
	  });

	  // The whole response has been received, so send back the result
	  resp.on('end', function() {
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