console.log('加载content.js')

window.onload = async () => {
	// 页面获取
	var link_arr = []
	$(".js_site-item").each(function(index, data){
		link_arr.push(data.innerText)
	})
	console.log('页面获取结果:',link_arr)

	// 接口获取
	chrome.runtime.sendMessage({
		data: {
			'url': 'api/citymenu'
		}
	}, res => {
		console.log('citymenu接口获取结果:',res)
	})
}