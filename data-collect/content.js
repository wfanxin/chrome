window.onload = async () => {
	// 等待函数
	const sleep = (time) => new Promise((resolve, reject) => setTimeout(resolve, time))

	// 给background.js发送信息的函数
	const sendMessage = (url) => {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage({
				data: {
					'url': url
				}
			}, res => {
				resolve(res)
			})
		})
	}

	// 页面获取
	var link_arr = []
	$(".js_site-item").each(function(index, data){
		link_arr.push(data.innerText)
	})
	console.log('页面获取结果:', link_arr)

	console.log('api/citymenu接口获取结果:', await sendMessage('api/citymenu'))
}
