博客地址：https://blog.kazaff.me/2016/09/09/%E8%AF%91-%E5%9C%A8%E5%A4%9A%E4%B8%AA%E6%A0%87%E7%AD%BE%E9%A1%B5%E4%B9%8B%E9%97%B4%E5%85%B1%E4%BA%ABsessionStorage/

#### 现有的浏览器存储机制

- **localStorage**：~5MB，数据永久保存直到用户手动删除
- **sessionStorage**：~5MB，数据只在当前标签页有效
- **cookie**：~4KB，可以设置成永久有效
- **session cookie**：~4KB，当用户关闭浏览器时删除（并非总能立即删除）

##### 1、利用localStorage事件来跨标签页共享sessionStorage

https://blog.guya.net/security/browser_session/sessionStorage.html

现有标签会通过localstorage事件来传递数据到新打开的标签页中，我们只需要复制一根本地sessionStorage即可。

传递过来的sessionStorage绝对不会保存在localstorage，从localstorage事件将数据中复制并保存到sessionStorage，这个流程是在同一个调用中完成，没有中间状态。而且数据是对应事件携带的，并不存在localStorage中。

```javascript
// 为了简单明了删除了对IE的支持
(function() {

	if (!sessionStorage.length) {
		// 这个调用能触发目标事件，从而达到共享数据的目的
		localStorage.setItem('getSessionStorage', Date.now());
	};

	// 该事件是核心
	window.addEventListener('storage', function(event) {
		if (event.key == 'getSessionStorage') {
			// 已存在的标签页会收到这个事件
			localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
			localStorage.removeItem('sessionStorage');

		} else if (event.key == 'sessionStorage' && !sessionStorage.length) {
			// 新开启的标签页会收到这个事件
			var data = JSON.parse(event.newValue),
					value;

			for (key in data) {
				sessionStorage.setItem(key, data[key]);
			}
		}
	});
})();
```

##### 2、跨标签页共享memoryStorage

https://blog.guya.net/security/browser_session/memoryStorage.html

唯一一个真正安全的实现浏览器端保存认证token的方法了，并且要保证用户打开多个标签页不需要重新登录。关闭标签页，会话立即过期。

**致命缺点**：当只有一个标签页时，浏览器刷新会导致用户重新登录。

```javascript
(function() {

	window.memoryStorage = {};

	function isEmpty(o) {
		for (var i in o) {
	  		return false;
	 	}
	 	return true;
	};

	if (isEmpty(memoryStorage)) {
		localStorage.setItem('getSessionStorage', Date.now());
	};

	window.addEventListener('storage', function(event) {
		if (event.key == 'getSessionStorage') {
			localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));
			localStorage.removeItem('sessionStorage');

		} else if (event.key == 'sessionStorage' && isEmpty(memoryStorage)) {
			var data = JSON.parse(event.newValue),
						value;

			for (key in data) {
				memoryStorage[key] = data[key];
			}
		}
	});
})();
```

3、vue版

https://github.com/xanf/vuex-shared-mutations

```bash
npm install vuex-shared-mutations


import createMutationsSharer from "vuex-shared-mutations";

const store = new Vuex.Store({
  // ...
  plugins: [createMutationsSharer({ predicate: ["mutation1", "mutation2"] })]
});


# same as
import createMutationsSharer from "vuex-shared-mutations";

const store = new Vuex.Store({
  // ...
  plugins: [
    createMutationsSharer({
      predicate: (mutation, state) => {
        const predicate = ["mutation1", "mutation2"];
        // Conditionally trigger other plugins subscription event here to
        // have them called only once (in the tab where the commit happened)
        // ie. save certain values to localStorage
        // pluginStateChanged(mutation, state)
        return predicate.indexOf(mutation.type) >= 0;
      }
    })
  ]
});
```

完整代码：

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Sharing sessionStorage between tabs for secure multi-tab authentication</title>
	</head>
	<body>
		<h3><a href=''>sessionStorage</a></h3>
		<h3 id="stData"></h3>
		<button id="btnSet">Set session storage</button>
		&nbsp;&nbsp;&nbsp;&nbsp;
		<button id="btnClear">Clear session storage</button>

		<script type="text/javascript">

			// Removed IE support in this demo for the sake of simplicity

			(function() {

				if (!sessionStorage.length) {
					// Ask other tabs for session storage
					localStorage.setItem('getSessionStorage', Date.now());
				};

				window.addEventListener('storage', function(event) {

					//console.log('storage event', event);

					if (event.key == 'getSessionStorage') {
						// Some tab asked for the sessionStorage -> send it

						localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
						localStorage.removeItem('sessionStorage');

					} else if (event.key == 'sessionStorage' && !sessionStorage.length) {
						// sessionStorage is empty -> fill it

						var data = JSON.parse(event.newValue),
									value;

						for (key in data) {
							sessionStorage.setItem(key, data[key]);
						}

						showSessionStorage();
					}
				});

				window.onbeforeunload = function() {
					//sessionStorage.clear();
				};


				/* This code is only for the UI in the demo, it's not part of the sulotion */

				var el;

				function showSessionStorage() {
					el.innerHTML = sessionStorage.length ? JSON.stringify(sessionStorage) : 'sessionStorage is empty';
				}

				window.addEventListener('load', function() {
					el = document.getElementById('stData');
					showSessionStorage();

					document.getElementById('btnSet').addEventListener('click', function() {
						sessionStorage.setItem('token', '123456789');
						showSessionStorage();
					})

					document.getElementById('btnClear').addEventListener('click', function() {
						sessionStorage.clear();
						showSessionStorage();
					})
				})

			})();
		</script>
	</body>
</html>

```

