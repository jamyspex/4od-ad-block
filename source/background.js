chrome.webRequest.onHeadersReceived.addListener(
  function() { return {redirectUrl: "data:text/xml,%3CadResponse%20%2F%3E"}; },
  { urls: ["http://mrm.channel4.com/ad/p/*"], types: ["object"] },
  ["blocking"]
);