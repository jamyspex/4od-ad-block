var playerFileName = "4odplayer-11.79.swf";

function onBeforeRequest (info) {

    // Get the file name of the 4oD player
    var requestedPlayerFileName = /[^\/]+$/.exec(info.url)[0];
    
    // Show default status
    updateStatus(info.tabId, "Default");
    
    // Check for updated player
    if(requestedPlayerFileName !== playerFileName){
        newPlayerDetected(info.tabId, requestedPlayerFileName);
    }
};

function newPlayerDetected(tabId, requestedPlayerFileName){

    updateStatus(tabId, "Fail");
    
    // Check for extension updates
    chrome.runtime.requestUpdateCheck(function(status){
        if(status === "update_available"){
            chrome.runtime.reload();
        }
    });
}

function onHeadersReceived(info) {
    var response = {};
    
    // Check if the response has text/xml content type
    if(isResponseTextXml(info.responseHeaders))
    {
        // Redirect to data URL with empty adResponse node
        response.redirectUrl = "data:text/xml,%3CadResponse%20%2F%3E";
        
        // Feedback to the user that ad blocking was invoked
        updateStatus(info.tabId, "Success");
    }
    
    return response;
}

function isResponseTextXml (headers){
    for(var i = 0, j= headers.length; i < j; i++){
        if(headers[i].name === "Content-Type" && headers[i].value === "text/xml"){
            return true;
        }
    }
};

function updateStatus (tabId, status) {
    var popup = (status === "Fail") ? "popup.html" : "";
    chrome.pageAction.setPopup({
        tabId: tabId,
        popup: popup
    });
    chrome.pageAction.setIcon({
        tabId: tabId,
        path: "images/pageAction" + status + ".png"});
    chrome.pageAction.show(tabId);
};

chrome.webRequest.onBeforeRequest.addListener(
    onBeforeRequest,
    { urls: ["http://www.channel4.com/static/programmes-flash/swf/4odplayer*"] },
    []
);

chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceived,
    { urls: ["http://mrm.channel4.com/ad/p/*"], types: ["object"] },
    ["blocking", "responseHeaders"]
);