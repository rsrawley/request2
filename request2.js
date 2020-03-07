
// This module replaces the deprecated request in npm

module.exports = function (options,callback) {
	// Possible options :
	// url : address to call
	// json : true -- body is expected JSON, so parse it

	let url = options.url;
	let jsonFlag = options.json;

	const https = require('https');

	https.get(url, function (resp) {
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