console.log('加载background.js')

const request_url = []
chrome.webRequest.onBeforeRequest.addListener(function(details){
	if (details.type === 'xmlhttprequest') {
		let url = details.url.split('?')[0]
		if (url.indexOf('api/') !== -1) {
			request_url[url.substr(url.indexOf('api/'))] = details.url
		}
		
	}
}, {urls:['<all_urls>']}, ['blocking'])

chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
	let data = []
	const url = request_url[req.data['url']]
	if (url !== undefined) {
		$.ajax({
	        url: url,
	        method: 'get',
	        dataType: 'json',
	        async: false,
	        success: function(res) {
	            data = res
	        }
	    })
	}
    
    sendResponse(data)
})