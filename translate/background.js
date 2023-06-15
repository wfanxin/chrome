chrome.contextMenus.create({
    title: '翻译',
    contexts: ['selection'],
    onclick: function(info) {
    	window.open('https://fanyi.baidu.com/#zh/en/' + info.selectionText)
    }
}, function() {
	console.log('contextMenus创建成功')
})