const request_url = []

// 获取request请求数据
chrome.webRequest.onBeforeRequest.addListener(function(details){
	if (details.type === 'xmlhttprequest') {
		let url = details.url.split('?')[0]
		if (url.indexOf('api/') !== -1) {
			request_url[url.substr(url.indexOf('api/'))] = details.url
		}
		
	}
}, {urls:['<all_urls>']}, ['blocking'])

// 监听sendMessage信息
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
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
	} else if (req.data['url'] === 'apiList'){
		data = Object.keys(request_url)
	}
    
    sendResponse(data)
})