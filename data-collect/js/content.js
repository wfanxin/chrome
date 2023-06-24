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

	// 显示面板函数
	const showPanel = async () => {
		// 获取页面api请求接口列表
		const apiList = await sendMessage('apiList')
		let html = '<div class="apiList"><div class="apiTitle">页面数据获取</div><div class="apiContent"><div>页面内容<span class="apiBtn" url="">获取</span></div></div><div class="apiTitle">api接口数据获取</div><div class="apiContent">'
		for (let i = 0; i < apiList.length; i++) {
			html += '<div>'+apiList[i]+'<span class="apiBtn" url="'+apiList[i]+'">获取</span></div>'
		}
		html += '</div></div>'
		$("body").append(html)

		// 点击事件
		$(".apiBtn").click(async function(){
			const url = $(this).attr('url')
			if (url === '') {
				let link_arr = []
				$(".js_site-item").each(function(index, data){
					link_arr.push(data.innerText)
				})
				alert(JSON.stringify(link_arr))
			} else {
				const result = await sendMessage(url)
				alert(JSON.stringify(result))
			}
		})
	}

	// 请求token，用来判断是否已登录
	const token = await sendMessage('token')

	// 已登录，则显示面板
	if (token) {
		showPanel()
	}
}
