// 登录事件
$('.login-btn').click(function(){
	const name = $("input[name='name']").val()
	const password = $("input[name='password']").val()

	if (name == '' || password == '') {
		return false
	}

	// 这里模拟后台处理，实际是aja请求登录接口
	postLogin(name, password)
	
})

// 退出事件
$('.login-out-btn').click(function() {
	// 这里模拟后台处理，实际是aja请求退出接口
	postLoginOut(token)
	
})

// 登录接口请求
const postLogin = function(name, password) {
	if (name == 'admin' && password == '123456') {
		showWelcome()
		sendMessage('loginIn')
		localStorage.setItem('Collect-Token', new Date().getTime())
		new Notification('登录成功', { body: '', icon: '../image/logo.png' })
	} else {
		new Notification('登录失败', { body: '', icon: '../image/logo.png' })
	}
}

// 退出接口请求
const postLoginOut = function(token) {
	showLogin()
	sendMessage('loginOut')
	localStorage.removeItem('Collect-Token')
	new Notification('退出成功', { body: '', icon: '../image/logo.png' })
}

// 显示登录页面
const showLogin = function() {
	$('.login-in').css('display', 'block')
	$('.login-welcome').css('display', 'none')
}

// 显示欢迎页面
const showWelcome = function() {
	$('.login-welcome').css('display', 'block')
	$('.login-in').css('display', 'none')
}

// 向content.js传递信息
const sendMessage = function(type) {
	let isOpen = false
	chrome.tabs.query({}, function(tabs) {
	    for (let i = 0; i < tabs.length; i++) {
	    	if (tabs[i].url) { // 有权限的页面，即www.hao123.com
	    		isOpen = true
	    		chrome.tabs.sendMessage(tabs[i].id, type)
	    	}
	    }
	    if (type === 'loginIn' && !isOpen) { // 登录后发现没有打开，自动打开www.hao123.com
			window.open('http://www.hao123.com')
		}
	})
}

// 判断是否已经登录
const token = localStorage.getItem('Collect-Token')
if (token) { // 已登录
	showWelcome()
} else { // 未登录
	showLogin()
}