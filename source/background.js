// Expected 4oD Player version
var playerFileName = "4odplayer-bips.swf";

// Show appropriate page action in the omnibar
function updateStatus (tabId, isSuccess) {
    var popup = isSuccess ? "popupSuccess.html" : "popupFail.html";
    var iconPath = isSuccess ? "images/pageActionSuccess.png" : "images/pageActionFail.png";
    chrome.pageAction.setPopup({ tabId: tabId, popup: popup });
    chrome.pageAction.setIcon({ tabId: tabId, path: iconPath });
    chrome.pageAction.show(tabId);
}

function onPlayerBeforeRequest(info) {
	
	// Get the file name of the 4oD player
    var requestedPlayerFileName = /[^\/]+$/.exec(info.url)[0];

    // Check for updated player
    if(requestedPlayerFileName == playerFileName){
	
		// Update status to show success indicator
		updateStatus(info.tabId, true);
		
	}else{
	
		// Update status to show failure indicator
		updateStatus(info.tabId, false);
		
		// Check for extension updates
		chrome.runtime.requestUpdateCheck(function(status){
			if(status === "update_available"){
				chrome.runtime.reload();
			}
		});
	}
}

function onAdManagerHeadersReceived(info) {
    return { cancel: true };
}

chrome.webRequest.onBeforeRequest.addListener(
    onPlayerBeforeRequest,
    { urls: ["http://www.channel4.com/static/programmes-flash/swf/4odplayer*"] }
);

chrome.webRequest.onBeforeRequest.addListener(
    onAdManagerHeadersReceived,
    { urls: ["http://mrmam.channel4.com/p/c4_live/AdManager.swf*"] },
    ["blocking"]
);
