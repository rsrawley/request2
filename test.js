let request = require("./request2.js")

let url = "http://192.168.1.53";

request({"url":url},function(error,response,body){
	console.log("error")
	console.log(error)
	console.log("response")
	console.log(response)
	console.log("body")
	console.log(body)
})