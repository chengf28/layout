var layout = {
	__style: {
		overflow: {
			'background'     : 'rgba(0,0,0,0.6)',
			'width'          : '100%',
			'height'         : '100%',
			'position'       : 'fixed',
			'top'            : 0,
			'left'           : 0,
			'right'          : 0,
			'bottom'         : 0,
			"z-index"        : 10000,
			'display'        : 'flex',
			'align-items'    : 'center',
			'justify-content': 'center'
		},
		box: {
			'position'  : 'relative',
			'color'     : 'black',
			'overflow'  : 'hidden',
			'transition': 'all .4s',
			'transform' : 'scale(0)'
		},
		box_head: {
			'background'             : '#00c292',
			'padding'                : '1rem 0 1rem 1rem',
			'color'                  : '#fff',
			'border-top-left-radius' : '.5rem',
			'border-top-right-radius': '.5rem'
		},
		box_body: {
			'max-width' : '300px',
			'word-wrap' : 'break-word',
			'padding'   : '2rem 3rem',
			'background': '#fff',
		},
		box_foot: {
			'padding'                   : '0 1rem 1rem 1rem',
			'display'                   : 'flex',
			'justify-content'           : 'flex-end',
			'width'                     : '100%',
			'box-sizing'                : 'border-box',
			'background'                : '#fff',
			'border-bottom-left-radius' : '.5rem',
			'border-bottom-right-radius': '.5rem'
		},
		box_foot_button: {
			'display'      : ' block',
			'background'   : ' none',
			'outline'      : ' none',
			'border'       : ' none',
			'padding'      : ' .5rem',
			'cursor'       : ' pointer',
			'margin'       : ' 0 .5rem',
			'border'       : ' 1px solid #ddd',
			'border-radius': ' .5rem',
			'transition'   : 'all .3s'
		},
	},
	__toole: {
		style: function (style) {
			var css = '';
			for (var key in style) {
				css += key + ':' + style[key] + ';';
			}
			return css;
		}
	},
	__index: [],
	overflow: function (i) {
		var div = this.cElement('', this.__style.overflow, div, id = 'layout-overflow'+i)
		// document.body.appendChild(div);
		return div;
	},
	cElement: function (text = '', style = '', type = 'div', id = '') {
		var dom = document.createElement(type);
		if (style) {
			dom.style.cssText = this.__toole.style(style);
		}
		if (text.length > 0) {
			dom.innerText = text;
		}
		if (id.length > 0) {
			dom.id = id;
		}
		return dom;
	},
	appendNode: function (node) {

		node.forEach(n => {
			// 有子节点,向下探
			if (n.hasOwnProperty('nodeChild')) {
				// 将父级节点堆入堆中;
				this.__index.push(n.nodeRoot);
				// 继续探索
				this.appendNode(n.nodeChild);
				this.__index.pop();
			}
			// 如果没有子节点,进行dom操作,在上级dom中,执行操作
			var dom = this.__index[this.__index.length - 1];
			if (dom) {
				dom.appendChild(n.nodeRoot);
			} else {
				document.body.appendChild(n.nodeRoot);
			}

		})

	},
	// 消息方法
	alert: function (msg, config, ...func) {
		var title = '消息';
		// 复制对象
		var head_style = JSON.parse(JSON.stringify(this.__style.box_head));
		var btn_name = ['确认'];
		// 如果是对象,则判断
		if (config) {
			// 对象
			if (typeof (config) === 'object' && isNaN(config.length)) {
				title = !config.hasOwnProperty('title') ? title : config['title'];
				if (config.hasOwnProperty('btn')) {
					switch (typeof (config['btn'])) {
						case 'string':
							btn_name[0] = config['btn'];
							break;

						case 'object':
							btn_name = config['btn'];
							break;
					}
				}
				for (key in head_style ) {
					if (config.hasOwnProperty(key)) {
						head_style[key] = config[key];
					}
				}
			}
			// 如果没有填写配置,直接执行function,将其堆入func中
			if (typeof (config) === 'function') {
				if (func) {
					func.unshift(config);
				} else {
					func = [config];
				}
			}
		}



		// 添加遮罩层
		var partent = this.overflow(new Date().getTime());
		
		/* 生成dom元素 */
		// 生成元素
		var btn_array = [];
		for (let index = 0; index < btn_name.length; index++) {
			btn_array.push({ nodeRoot: this.cElement(btn_name[index], this.__style.box_foot_button, 'button', 'button' + index) });
		}
		var b_foot = this.cElement('', this.__style.box_foot, 'div');
		var b_head = this.cElement(title, head_style, 'div');
		var b_body = this.cElement(msg, this.__style.box_body, 'div');
		var box = this.cElement('', this.__style.box, 'div', 'layout-box');

		// 元素添加节点
		var node = [{
			nodeRoot: partent,
			nodeChild:
				[{
					nodeRoot: box,
					nodeChild: [{
						nodeRoot: b_head
					}, {
						nodeRoot: b_body,
					}, {
						nodeRoot: b_foot,
						nodeChild: btn_array
					}]
				}]
		}];
		this.appendNode(node);
		// 添加按钮事件监听
		for (let i = 0; i < btn_array.length; i++) {
			btn_array[i].nodeRoot.onmouseover = function () {
				this.style.background = head_style['background'];
				this.style.color = '#fff';
			};
			btn_array[i].nodeRoot.onmouseout = function () {
				this.style.background = 'none';
				this.style.color = '#000';
			};

			// 添加点击关闭弹出层功能
			btn_array[i].nodeRoot.onclick = function () {
				if (func[i]) {
					func[i]();
				}
				layout.close(partent);
			};

		}

		// 延迟.01秒执行放大效果
		setTimeout(function () {
			box.style.transform = 'scale(1)';
		}, 100);

	},
	close: function (partent) 
	{
		document.body.removeChild(partent);
	}
}