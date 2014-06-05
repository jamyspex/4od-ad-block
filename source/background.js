chrome.webRequest.onHeadersReceived.addListener(
  function(info) {
	var response = {};
	console.log("onHeadersReceived", this, arguments);
	if(info.method == "POST")
	{
		response.redirectUrl = "data:text/xml,%3CadResponse%20%2F%3E";
	}
	return response;
  },
  { urls: ["http://mrm.channel4.com/ad/p/*"], types: ["object"] },
  ["blocking"]
);