chrome.webRequest.onHeadersReceived.addListener(
  function(info) {
	var response = {};
	if(isTextXml(info.responseHeaders))
	{
		response.redirectUrl = "data:text/xml,%3CadResponse%20%2F%3E";
	}
	return response;
  },
  { urls: ["http://mrm.channel4.com/ad/p/*"], types: ["object"] },
  ["blocking", "responseHeaders"]
);

var isTextXml = function(headers){
    for(var i = 0, j= headers.length; i < j; i++){
        if(headers[i].name === "Content-Type" && headers[i].value === "text/xml"){
            return true;
        }
    }
}