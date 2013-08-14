/**
 * @author 王迎然(www.wangyingran.com)
 * @module ready模块
 * @link n.js
 */

!function(window) {
	
	var document = window.document,
		// 函数队列
		funcQueue = [],
		attEvent = document.attachEvent,
		eventType = attEvent ? 'onreadystatechange' : DOMContentLoaded,
		// 判断页面是否加载完毕
		isReady = false,
		readyBound = false;
	
	var fireReady = function() {
		// 如果加载完毕，直接返回
		if (isReady) return;
		// 设置标识
		isReady = true;
		// 执行队列函数
		for (var i = 0; i < funcQueue.length; i++) {
			funcQueue[i]();
		}
		// 清空队列
		funcQueue = null;
	}
	
	var DOMContentLoaded = function() {
		n.un(document, eventType, DOMContentLoaded);
    };

	var readyPromise = function() {
		
		if (readyBound) return;
		readyBound = true;

		n.on(document, eventType, DOMContentLoaded);
		// 如果是标准浏览器则使用 DOMContentLoaded
		 if (attEvent){		
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}
			
			// 如果是ie，并且不存在iframe，连续检查是否加载完毕
			if (top && top.doScroll) {
				(function doScrollCheck() {
					if (!isReady) {
						try {
							top.doScroll('left');
						} catch (e) {
							setTimeout(doScrollCheck, 0);
							return;
						}
						fireReady();
					}
				})();
			}
		}

	};
	
	var ready = function(f) {
		if (isReady) {
			f();
		} else {
			funcQueue.push(f);
			readyPromise();
		}
	};

	/**
	 * 追加ready模块到n命名空间上
	 * @namespace n
	 */
	n.mix(n, {
		ready : function(f) {
			ready(f);
		}
	});

}(this);