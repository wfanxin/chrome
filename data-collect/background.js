console.log('加载background.js')

chrome.webRequest.onBeforeRequest.addListener(function(details){
	// if (details.url.indexOf('citymenu') != -1) {
		console.log(details)
	// }
    

}, {urls:['<all_urls>']}, ['blocking'])