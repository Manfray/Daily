# 前端大全

## 编程思想

### 架构模式

- MVC
- MVVM
- MVP
- Code Blocks
- Code Behind

### 设计模式

- 单例模式
- 工厂模式
- 策略模式
- 发布订阅模式
- 代理模式
- 命令模式
- 适配器模式
- .....

### 编程范型

- 面向对象编程（OOP）
- 面向切面编程（AOP）
- 函数式编程
- 响应式编程

### 程序设计

- 结构化程序

	- 自顶而下
	- 逐步求精
	- 模块化
	- 限制使用goto

- 面向对象程序

	- 单一功能原则（S）
	- 开放关闭原则（O）
	- 里氏替换原则（L）
	- 接口隔离原则（I）
	- 依赖反转原则（D）

### 解决方案

- 适配方案

	- 通过媒体查询
	- viewport缩放

		- 简单、高效

	- rem布局

		- 动态设置根元素font-size，等比缩放元素大小

- lazyimage

	- 图片先用占位图表示，属性放到data里面
	- 页面加载完成后，监听窗口滚动，
	- 当图片出现在视口内，再赋予真实的地址

- 移动端300ms延时
- 骨架屏

## 前端基础

### HTML（5）

- Canvas
- SVG
- Drag 、 drop 拖拽
- Video、audio
- web worker
- localStorage、sessionStorage
- navigator.geolocation.getCurrentPosition()
地理定位 

### CSS

- 权重

	-     !important>行内样式>ID选择器 > 类选择器 | 属性选择器 | 伪类选择器 > 元素选择器

- 盒模型

	- 将所有元素表示为一个矩形盒
	- 这个模型描述了元素所占空间的内容。
每个盒子有四个边：外边距, 边框, 内填充边与 内容。
	- 两种

		- 标准

			- box-sizing: content-box

				- width = content

		- IE

			- box-sizing: border-box

				- width = content+padding+margin

			- IE盒模型用的最多，也是被推荐使用的

- 流式布局

	- 以“块”和“内联”元素的最基础的自动排列方式
	- 本质上是一系列的元素，都在布局中一起工作，项目了解，一旦脱离的流，就会独立的工作
	- 规则

		- 按照先后位置从上而下布局
		- 行内元素水平排列，占满一行后后换行
		- 块级元素独占一行

- 选择器匹配规则

	- 从右向左
	- 探究 CSS 解析原理

		- https://juejin.im/entry/5a123c55f265da432240cc90

	- css *号

		- *可以继承
		- 从后向前

			- ？

- 定位方案

	- 浮动定位

		- 先按照普通流的位置出现
		- 然后脱离文档流，根据浮动的方向尽可能的向左或右偏移

	- 绝对定位

		- 脱离普通流
		- 不会影响其兄弟元素
		- 具体坐标由决定定位的坐标决定

- FC

	- 概念

		- 格式化上下文
		- 特定规则的区域，独立的容器和布局环境
		- 一个封闭的大箱子，内部无论如何变化，都不会影响到外部

	- 分类

		- IFC

			- 高度

				- 由包含元素的实际高度计算得出
				- 不受竖直方向margin/padding影响

		- BFC

			- 规则

				- 继承了普通流的定位规则
				- 浮动

					- 高度包含内部的浮动元素
					- 不会与外部的浮动元素重叠

				- 垂直方向的距离由margin决定。
属于同一个BFC的两个相邻的BlockBox的margin会发生重叠。

			- 创建

				- 根元素 body
				- overflow 值不为 visible 的块元素
				- 浮动元素 float不为none
				- 绝对定位元素

					- position为absolute和fixed

				- 行内块元素

					- inline-block

				- 弹性元素
				- 网格元素

			- 应用

				- 外边距折叠（Margin collapsing）

					- 有的译成外边距塌陷
					- 规范

						- 相邻盒子(可以是兄弟或祖先关系？)的外边距可以结合成一个单独的外边距

					- 发生情况

						- 属于同一个BFC的块级元素
						- 在normal flow的布局中

							- 也就是说绝对定位元素和浮动元素不会发生折叠

						- 垂直方向相邻
						- 块级盒子

							- 也就是说inline-block不会发生折叠
							- 也就是说水平方向不会发生折叠

					- 解决

						- 放在个BFC中

				- BFC可以包含浮动的元素

					- 场景描述

						- 一个block元素中，包含一个浮动元素，此时block元素会失去高度

					- 解决

						- 为block元素加入overflow:hidden属性，触发BFC
						- 那么容器就回包裹着元素

				- 阻止被浮动元素覆盖

				  <div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
				  <div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
				  也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>

				- 两列布局

		- GFC
		- FFC

- position和zindex

	- 决定同一父元素中的同级子元素的垂直方向顺序
	- position属性：relative、absolute、fixed

-  常见行内元素和块级元素

	- 行内

		-  b, em, strong,
		- a, br, img, span, sub, sup
		- button, input, label, select, textarea

	- 块级

		- canvas，div，dl，footer，form，h1，header，hr，p，pre，section，table，ul，li

- inline和inline-block

	- inline

		- 不会独占一行
		- 多个相邻的行内元素会排列在同一行里，直到一行排列不下
		- 设置width,height属性无效
		- 水平margin、padding有效，
垂直margin、padding无效

	- block

		- 独占一行
		- 默认情况下，block元素宽度自动填满其父元素宽度
		- 可以设置width,height属性
		- 设置margin和padding有效

	- inline-block

		- 对象呈现为inline对象，但是对象的内容作为block对象呈现
		- Margin?

- margin: 0 auto水平居中原因

	- 水平方向独占一行
	- auto是自动分配剩余空间的意思

- 清除浮动

	- 利用overflow包裹浮动
	- clear

		-  利用伪元素（clearfix）
		- 父元素结束标签之前插入清除浮动的块级元素
		- 利用clear样式

- css3技巧

	- vw、vh
	- calc
	- transition

- 居中

	- 水平居中

		- 行内元素

			- text-align: center

		- 块级元素

			- 定宽

				- margin: 0 auto

			- 不定宽

				- flex
				- inline-block + text-align:center

	- 垂直居中布局

		- 文本垂直居中

			- line-height:height

		- margin + translate
		- Relative + margin + top
		- 表格

		  .box1{
		  display: table-cell;
		  vertical-align: middle;
		  text-align: center; 
		  }
		  

		- flex

			- justify-content

				- 主轴

			- align-center

				- 交叉轴

			- margin: auto

- 布局案例

	- https://github.com/hookex/layout

### JS

- XMLHttpRequest

	- new XMLHttpRequest()
	- xhr.open
	- onload

		- status == 200 || status == 304

- dom操作

	- 基础

		- 创建

			- document.createElement
			- document.createTextNode

		- 删除

			- removeChild

		- 修改

			- insertBefore
			- replaceChild
			- appendChild

		- 查

			- document.getElementById
			- document.querySelector 

	- JS交换两个节点如何实现

	  <div id="parent">
	      <span id="a1">a</span>
	      <span id="b1">b</span>
	  </div>
	  <script>
	      let changeNode = document.getElementById("b1");
	      let existingnode= document.getElementById("a1");
	      let p= document.getElementById("parent");
	      p.insertBefore(changeNode,existingnode);
	  </script>

- 创建对象

	- {}
	- new

		- 模拟

			- https://gist.github.com/hookex/25eaf1338110cdcac24ea27f02d42de6#file-new-ts

	- Object.create(proto, [propertiesObject])

		- Object.create(null) 无原型的对象

- 数组判断

	- Array.isArray([])
	- Object.prototype.toString.apply([]) === "[object Array]"
	- [].constructor === Array
	- [] instanceof Array === true

- slice vs splice

	- slice

		- 切片
		- return 选定的元素作为新的数组对象
		- 不更改原始数组

	- splice

		- 铰接
		- return 已删除的项
		- 更改原始数组

- for-in for-of

	- for-in

		- 循环对象&数组
		- 循环只遍历可枚举属性
		- 可枚举属性
从构造函数原型中继承的属性（更接近原型链中对象的属性覆盖原型属性）。
		- 如果你只要考虑对象本身的属性，而不是它的原型，那么使用 getOwnPropertyNames() 或执行 hasOwnProperty() 来确定某属性是否是对象本身的属性（也能使用propertyIsEnumerable)

	- for-of

		- 循环数组
		- ES6新特性
		- 不会循环对象的key，只会循环对象的value
		- 遍历实现iterator接口

- 箭头函数

	- 更简短&不绑定this
	- 没有this, arguments
	- 不能用作构造函数

- ES6

	- let

		- 暂时性死区

			- 存在，但是不让使用
			- 所以提前使用会报错

	- const

		- 除了不能再赋值以外，和let相同

	- 块级作用域
	- =>
	- 解构
	- Set
	- map
	- symbol

		- 不可改变且唯一的
		- 以被用做对象属性的键
		- 对原始数据类型的隐式对象包装器。
		- 可以用来避免被覆盖

	- 模板字符串
	- module

		- 和CMD的区别

			- ES6

				- 静态分析
				- 引用方式
				- 异步

- 类型化数组

	- 通用的、固定长度的二进制数据缓冲区

- JS开始执行时机

	- window.load

		- 必须等待网页中所有内容加载完毕后才能执行

	- ondomcontentloaded

		- dom结构绘制完毕后开始执行
		- $(document).ready

			- 封装了ondomcontentready、ondomcontentloaded

- 事件

	- 本质

		- 事件驱动

			- 浏览器中很多行为是异步

		- 会创建事件并放入执行队列，等待当前代码执行完成
		- GUI渲染线程与JS引擎线程互斥

	- 绑定，监听，委托的区别

		- 绑定

			- HTML直接绑定
			- 在JavaScript代码中绑定
			- 绑定事件监听函数

	- 事件委托

		- 一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。
		- 好处

			- 减少重复工作
			- 减少内存消耗

	- 异步事件驱动

		- 浏览器有一个内部大消息循环，Event Loop（事件循环），会轮询大的事件队列并处理事件
		- 只有前面的处理完毕了，空闲了才会执行这个事件

	- 事件流

		- 冒泡

			- 事件捕获
			- 目标阶段
			- 事件冒泡 （常用）

	- 宏任务&微任务

		- promise & setTimeout

- js异步操作 

	- 　　回调函数

		- 执行一个函数时，在函数内部处理操作，把操作结果以参数形式传入回调函数中
		- 坏处

			- 回调地狱
			- 不利于阅读
			- 不利于调整回调顺序

		- 好处

			- 代码清晰地表达出了执行关系

	- 　　监听事件
	- 　　定时器

		- 宏任务

	- ajax

		- Ajax请求确实是异步的，这请求是由浏览器新开一个线程请求，事件回调的时候是放入Event loop单线程事件队列等候处理

	- Promise

		- 标准
		- 立即执行
		- 微任务
		- 同步的立即执行函数

	- generator

		- 交出函数的执行权
		- 调用 Generator 函数，会返回一个内部指针
		- next 方法的作用是分阶段执行 Generator 函数
		- 流程不方便管理

	- async/await

		- 好

			- 异步操作的同步写法

		- 坏

			- 反设计
			- 容易引起性能问题

		- async返回一个promise
		- await让出线程，跳出async函数体
		-  Generator/function* 来实现
		- await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。

	- Observable
	- 事件循环

		- 执行一个宏任务（栈中没有就从事件队列中获取）
		- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
		- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
		- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
		- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）
		- 

- 复制对象

	- for-in
	- object.assign()

		- 浅拷贝

	- JSON.parse(JSON.stringify(obj))

		- 方法不能用于复制用户定义的对象方法
		- 不能用于复制循环引用对象。

	- 展开操作符(…)

		- 浅拷贝

	- 自实现

		- https://gist.github.com/hookex/25eaf1338110cdcac24ea27f02d42de6#file-copy-ts

- 编解码

	- escape

		- 已从Web 标准中删除
		- 对字符串进行编码，让计算机可以读取
		- 编码集合

			- 除

				- ASCII 字母和数字
				-  ASCII 标点符号  - _ . ! ~ * ' ( ) 

	- encode

		- encodeURI

			- 把字符串作为URI进行编码
			- 目的是对 URI 进行完整的编码
			- 编码集合

				- 除

					- 非转义字符

						- 字母 数字 - _ . ! ~ * ' ( )

					- 保留字符

						- ; , / ? : @ & = + $

					- 数字符号

						- #

		- encodeURIComponent

			- 编码集合

				- 除

					- 字母 数字 - _ . ! ~ * ' ( )

				- ;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号

					- 十六进制的转义序列

	- decode

		- docodeURI
		- decodeURIComponent

	- 为什么需要编解码？

- 事件阻止

	- 阻止传播

		- event.Propagation()

			- W3C

		- event.cancleBubble()

			- IE

	- 默认事件

		- event.preventDefault()

			- W3C

		- return false

			- 原生JS事件

				- 阻止默认行为

			- jQuery

				- 阻止默认行为
				- 阻止冒泡

			- W3c

		- e.returnValue = false

			- IE

- 闭包

	- 定义

		- 函数和其相关引用对象组成的实体

	- 闭包原理

		- 从schema语言借鉴来
		- 基础

			- 词法作用域
			- 函数的变量作用范围可以超越创建的它的环境

		- 在一些语言中，函数可以嵌套函数，当内部函数引用了外部函数的变量时，就有可能会形成闭包
		- 由于有引用，不会被垃圾回收

	- 弊端

		- 内存占用过多

	- 应用场景

		- 模仿块级作用域

			- settimeout  拿到正确的值

		- 创建私有变量
		- 封装相关的功能集

			- 模块化
			- jquery

		- 设计单例模式？
		- 惰性求值？

- 上下文

	- 变量对象

		- 变量 (var, 变量声明);
		-     函数的形参
		-     函数声明 (FunctionDeclaration, 缩写为FD);

	- 作用域链

		- 本质

			- 是指向变量对象的指针列表

				- 变量对象

					- arguments
					- this
					- 局部属性和方法

		- 定义

			- 每个函数都有自己的执行环境
			- 当代码在一个环境中执行时，会创建作用域链

		- 作用

			- 保证对执行环境的所有变量和函数的有序访问

		- 链

			- 前端

				- 当前代码所在环境的的变量对象

			- 下一个变量，来自外部执行环境
			- 最外层为全局执行环境

				- 作用域链的尽头

					- node

						-  global

					- web

						- window

		- 变量搜索
		- 静态作用域

	- this

		- this是面向对象的表示
		- 通过对象调用
		- 其它

			- window

		- 本质

			- this引用的是函数据以执行的环境对象

				- 执行环境

					- 全局执行环境

						- 创建

							- 当执行流进入一个函数时，函数的执行环境就会被推入环境栈中

						- 销毁

							- 在函数执行完之后，栈将其环境弹出，该环境被销毁

						- 定义

							- 每个执行环境都有一个与之关联的变量对象
							- 环境中定义的所有变量和函数都保存在这个对象中

					- 函数执行环境

						- 函数调用时时

							- 函数入栈
							- 创建执行环境
							- 创建作用域链

- 原型

	- 两方面

		- 对constructor模式的改善

			- 对constructor模式的改善
			- 避免重复定义

		- 设计思想

			- JS的设计思想

				- 不同于面向类，基于原型的语言是对实例友好的

			- 实现继承

	- 铁三角

		- 实例

			- prototype指向原型对象
			- constructor指向构造函数

		- 构造函数

			- prototype指向原型对象
			- constructor指向构Function

		- 原型对象

			- constructor指向构造函数
			- prototype指向原型的原型

	- 组合继承？
	- 读写

		- 读

			- 先遍历自身的属性，如果没有一层层往上层寻找

		- 写

			- 如果原型存在该属性，则对该实例自身创建属性

##  类库/框架        

###  工具库

- jQuery
- Zepto
- Bootstrap
- RxJS

  RxJS是使用Observables 的响应式编程的库，它使编写异步或基于回调的代码更容易。
  RxJS中数据的流向也是固定的，就是从发送者到订阅者
  promise相较于Rxjs而言功能更单一

- Moment.js

  JavaScript 日期处理类库

- Animate.css
- MUI
- Layui

### 开发库/框架

- Vue

	- Vuex
	- Vue-router
	- Vue-cli
	- 数据绑定

		- 实现原理

			- 数据劫持的方式来做数据绑定
			- 方法

				- Object.defineProperty()

					- getter
					- setter

				- notify
				- 监听变化

					- Watcher

						- Observer

	- UI库

		- Element UI
		- iView 
		- mint-ui

- React

	- 本质

		- 规范
		- 接口

	- 生命周期

		- shouldComponentUpdate
		- componentWillUpdate
		- componentDidUpdate
		- componentWillMount
		- componentDidMount
		- componentWillReciveProps
		- componentWillUnmout
		- shouldComponentUpdate
		- getSnapshotBeforeUpdate

	- state和props

		- state是做为状态管理
		- 而props相当于api，由外界传入

	- setState

		- 合并旧state
		- 放进state队列，等待更新

			- 集齐一批需要更新的组件然后一起更新

		- updater

			- react-dom

		- render
		- reconciler
		- 同步，但延后

	- 数组中的key

		- 提高比对效率

	- Virtual Dom

		- 可能非MVVM模式的必须选择
		- 性能

			- 不一定比原生更快
			- 同MVVM一样，速度在过得去的范围内

		- virtual DOM

			- 原理

				- 本质上就是在 JS 和 DOM 之间做了一个缓存

			- 会跟踪每一个组件的依赖关系
			- 弊端

				- 如果你的应用中，交互复杂，需要处理大量的UI变化，那么使用 Virtual DOM 是一个好主意。如果你更新元素并不频繁，那么 Virtual DOM 并不一定适用，性能很可能还不如直接操控 DOM。

			- 好处

				- diff
				- 抽象

			- diff算法

	- Redux

		- Predictable State Container
		- 三大原则

			- 单一数据源：state
			- state只读：action
			- 纯函数：reducer

		- 优势

			- 让视图层简单&快照化
			- 编程对数据的中心化处理
			- 针对数据更易操作

				- 函数话编程
				- 时间化
				- 状态持久性

	- Ant Design
	- diff时间复杂度

		- O(n)
		- 问题定义：讲一棵树转换成另一颗树的最小操作数
		- 新旧虚拟树比对，返回补丁对象
		- 折中的算法

			- 两个不同类型的元素会产生不同的树
			- 可以通过key prop来暗示哪些子元素在不同的渲染下保持稳定

- Angular

	- 脏值检查

		- 数据何时变化

			- 用户输入
			- 请求服务端数据
			- 定时事件

		- 监听变化

			- 使用zone.js Monkey patch的方式，监听所有异步事件

		- 变化检测

			- 新旧数据对比
			- angular改善的脏检查

				- 组件树

					- 每个组件都有自己的变化检测器

						- 变化检测器树

			- 数据流自上而下

				- 高效
				- 可预测

					- 相比之下，AngularJS采用的是双向数据流，错综复杂的数据流使得它不得不多次检查，使得数据最终趋向稳定。理论上，数据可能永远不稳定。AngularJS给出的策略是，脏检查超过10次，就认为程序有问题，不再进行检查。这个10，我不知道它的给出依据是什么，也许是个经验值吧。

			- 变化检测对象
			- 定制变化检测

	- DI

		- 目标

			- 控制反转

				- 好处

					- 降低代码之间的耦合度

				- 每个对象都需要获取与其合作的对象（也就是它所依赖的对象）的引用。如果这个获取过程要靠自身实

		- 实现方式

			- 依赖注入

				- Injector会自动帮你将需要的依赖注入到类的构造器里，并返回这个类的实例

		- 使用的三个技术

			- reflect-metadata
			- typescript
			- Decorator

	- 数组绑定
	- 生命周期

		- ngOnChanges
		- ngOnInit
		- ngDoCheck
		- ngAfterContentInit

			- 在外来内容被投影到组件中之后/投影组件内容的变更检测之后调用

		- ngAfterContentChecked
		- ngAfterViewInit

			- 初始化完/检测变更完组件视图及其子视图之后调用。

		- ngAfterViewChecked
		- ngOnDestroy

- Ember.js
- Knockout.js
- Backbone.js

## 领域分支

### 移动端

- H5网页

  唤起 App：
  判断浏览器，动态加载对应浏览器的下载逻辑
  通过 universal link、URL Scheme、a 标签、iframe 几种方式找出最适合这个浏览器的唤起方式。
  如果下载了 App，就会走打开逻辑，如果没有下载则走下载逻辑。
  如果已知不能唤起的浏览器引导其它浏览器打开

	- 例：微信里的网页

- Web App

	- SPA（single page web application）

		- SSR

		  服务端渲染（Server Side Render）：网页是通过服务端渲染生成后输出给客户端。

			- Nuxt.js
			- Next.js

	- PWA（Progressive Web App）

	  Chrome 团队开发，"渐进式 Web App"（Progressive Web App，缩写 PWA）。
	  PWA结合了最好的Web应用和最好的原生应用的用户体验。
	  它可以把网站缓存在手机里面，供离线时使用，还能在手机首屏生成图标，直接点击进入，并且有通知推送能力，也不带有浏览器的地址栏和状态栏，跟原生 App 的使用体验非常接近。
	  * 渐进式 - 每个用户都可用而不管选择什么样的浏览器，因为它们是以渐进式增强为核心原则构建的。
	  * 自适应 - 适应任何形态：桌面，移动设备，平板电脑或尚未出现的形式。
	  * 不依赖网络连接 - Service Workers允许离线工作，或在低质量网络上工作。
	  * 类似于应用程序 - 使用应用程序风格的交互和导航，感觉像一个应用程序。
	  * 保持最新 - 得益于service Woker的更新进程，应用能始终保持最新状态。
	  * 安全 - 借助于HTTPS，防止窥探，并确保内容没有被篡改
	  * 可发现 - 受益于W3C清单和service Worker注册作用域，搜索引擎可找到它们，可以识别为“应用程序”。
	  * 用户粘性 - 通过推送通知等功能让用户重返应用。
	  * 可安装 - 允许用户在主屏幕上“保留”他们认为最有用的应用程序，而无需经过应用程序商店。
	  * 可链接 - 通过URL轻松共享，不需要复杂的安装。

		- Service Worker

		  位于客户端（浏览器）和服务器之间的代理。
		  如果浏览器支持SW并且已注册，则SW文件将在ServiceWorkerGlobalScope中运行，这是一个独立的执行线程，不具有DOM访问权限，也不会干扰JS主线程。 Service worker生命周期事件包括。
		  安装 - 主要用来缓存静态资源（js，css，图片等）
		  激活 - 主要用于缓存管理
		  空闲
		  收发消息 - 处理后续页面加载的所有网络请求
		  终止 - 不使用时，节省内存

	- 例：扫码点餐

- hybrid App

	- Native + WebView

		- jsBridge 

	- Ionic 平台
	- Dcloud 平台
	- Cordova （PhoneGap前身）
	- 例：电商App

- Web to Native

	- React Native
	- Flutter
	- Weex

		- WeexSDK

	- Taro 

	  Taro 是一套遵循 React 语法规范的 多端开发 解决方案。
	  采用与 React 一致的组件化思想，组件生命周期与 React 保持一致，同时支持使用 JSX 语法

	- uni-app

- 小程序（微信/支付宝/百度/头条/QQ/钉钉）

	- webview渲染

- 快应用（十大手机厂商，共同发布快应用标准）

	- native渲染

### 可视化

- Canvas 2D

	- Echarts
	- HighCharts
	- AntV

	  AntV 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。

- SVG

	- D3
	- Snap
	- Raphael

- WebGL

	- Three.js

### 前端微服务

使用 HTTP 服务器的路由来重定向多个应用
在不同的框架之上设计通讯、加载机制，诸如 Mooa 和 Single-SPA
通过组合多个独立应用、组件来构建一个单体应用
iFrame。使用 iFrame 及自定义消息传递机制
使用纯 Web Components 构建应用
结合 Web Components 构建

- Egg.js 

### 系统设计

- 性能体验质量等较高的层面往下回答解决方案
- 设计思路

	- 面向问题的分析

		- 发现可以做的事情
		- 解决什么问题
		- ROI

	- 规划

		- 项目设计（明确重点）

			- 性能

				- 量化
				- 链路分析

			- 体验
			- 质量
			- 分层
			- 工程
			- 效率

		- 明确需要调用的资源
		- 如何推广

	- 把控过程

		- 排期

			- 时间
			- 难度
			- 任务量

	- 事后

		- 推广
		- 量化或质化分析

- 案例

	- 
	- 
	- 
	- 

### WebAssembly

### 复杂性管理

- 概念

	- 相互作用的成分组成的系统

- 应对

	- 较优选择、逐渐认知、相对有序

- 应用

	- 模型管理

		- 建模
		- 实践

			- 开发技术栈
			- 研发流程
			- 基础库
			- 工具栈
			- 开发规范

				- 代码规范
				- Commit规范
				- 版本规范

			- 最佳实践
			- 知识库

	- 不确定性管理

		- 未来、预期和风险
		- 实践

			- 奖惩规则明确
			- 提高对未来的信息

				- 技术的积累
				- 分享

	- 模块间效率管理

		- 实践

			- 团队如何分工
			- 跨团队配合

- 持续优化

### web游戏开发

- Cocos2d
- Egret Engine

## 服务端分支

### Node.js

- Express
- Koa
- Egg
- 压力测试

### web服务器

- Nginx
- Apache
- Tomcat

### 数据库模型

- 层次模型
- 网状模型
- 关系模型

	- SQL

		- MySQL
		- Oracle
		- SQL Server
		- .....

	- NOSQL

		- MongoDB
		- memcached
		- Redis
		- Cassandra
		- .....

## 全链路分支

### 模块化

- CommonJS
- SeaJS/CMD
- RequireJS/AMD
- CSS Module
- ES6 Module

### 依赖管理

- npm
- Yarn
- cnpm

### 构建工具

- Webpack

	- npm install

		- 查找

			- 寻找package.json并解析
			- 执行勾子preInstall
			- 确定首层依赖

				- 从根节点（项目）进行多进程遍历

		- 下载

			- 向指定源查找
			- 确定语义化版本
			- 和lock文件进行优先级比对
			- 三个优先级

				- 项目node_modules
				- .npm
				- 网络

		- 安装

			- deduple

				- 去除冗余模块
				- 扁平化处理

			- 安装模块

				- 更新node_modules

			- 执行勾子postInstall

	- webpack热更新

		- 监听变化

			- 对变化模块进行打包编译
			- 把编译后结果以JS对象形式写进内存

		- 通道传回

			- 建立webpack-dev-server和websocket的连接通道
			- 传递消息

				- 变化模块hash值

		- 更新代码

			- HotMuduleReplacement

				- 接收到变化模块hash值

			- JsonpMainTemplate

				- 根据hash集合，通过jsonp获取最新的模块代码

			- 如果热更失败，则退回到live reload操作

	- webpack loader和plugin区别

		- loader

			- 文件翻译器

		- plugin

			- 扩展编译过程
			- 在对应的事件节点定义操作

				- 资源管理
				- bundle文件优化
				- 输出信息

	- webpack模块化

		- 吸取了各个模块化的经验，把模块化的概念用于更多文件类型

	- webpack性能优化

		- 多进程处理
		- sourcemap可选
		- 编译成较新的es标准（ts的）
		- 缩小源文件定义范围
		- 平衡压缩配置
		- 平衡eslint配置
		- 代码分割

	- webpack vs rollup

		- rollup

			- tree-shaking
			- 对es6支持好

				- 基于2015模块

					- webpack使用CommonJS

			- 更适合开发基础库

	- 原理和思想

		- 核心是一个静态模块捆绑器，内部维护一个依赖关系图，映射每个模块并生成捆绑包
		- 概念

			- 配置化
			- 模块化
			- entry
			- loader
			- plugin
			- trunk

		- 过程

			- 模块依赖分析
			- webpack处理
			- 静态资源包

		- WebPack打包原理

			- require

				- 根据node的规范封装的模块化

			- 名词

				- loader

					- 模块转换器

				- plugin

					- 自定义打包流程

			- 过程

				- 准备

					- 加载所有插件

				- 确定入口文件
				- 编译

					- 递归寻找模块依赖
					- 调用loader对模块进行编译

				- 资源输出

					- 输出chunk文件

	- 整套构建部署流程

		- 工作流平台

			- gitlab | jenkins
			- DSL
			- runner

				- 考虑环境
				- 是否容器化

		- pipline

			- webhook
			- prepare
			- build
			- test

				- unit test
				- 安全检查

			- deploy

				- dev
				- prod

			- rollback

- Gulp

### 语言增强

- CSS

	- Less
	- Sass（scss）
	- Stylus
	- Post css

- JavaScript

	- TypeScript
	- CoffeeScript
	- Flow

### 代码质量

- 自动化测试

	- puppeteer

- 单元测试
- UI测试
- E2E测试

### 转换器

- Babel
- Traceur

### CI / CD

- Git web hook
- Jenkins

## 进阶分支

### 网络通信

- HTTP 应用层协议

	- 基本概念

		- 请求头

			- request header

		- 响应头

			- response header

		- 状态码

			- 分类

				- 1xx

					- 信息响应类
					- 100

						- 服务端收到请求头，客户端应继续发送body

				- 2xx

					- 处理成功响应类
					- 200

						- 请求成功
						- 请求的内容，随此返回

				- 3xx

					- 重定向响应类
					- 301

						- 请求的资源已永久移到新位置

					- 304 Not Modifyed

						- 版本未修改
						- 客户端仍有以前的副本，服务端无需传回资源

				- 4xx

					- 客户端错误类
					- 400

						- 客户端有语法错误，不能被服务器理解

					- 401    未授权
					- 403    拒绝提供服务
					- 404 资源不存在

				- 5xx

					- 通用错误消息
					- 500

						- 服务端异常，没有给出具体信息

			- 解决了什么问题

		- 报文

			- 是什么

				- 承载多个请求参数的数据

			- 报文格式

		- 一次http完整的过程

			- 输入网址
			- 根据DNS，将域名解析为IP地址
			- 建立TCP连接

				- 三次握手

			- 客户端发送报文
			- 服务端应答

				- 服务端返回状态码和请求体

			- 关闭TCP连接

	- http2

		- 基于google SPDY
		- 多路复用

			- 相同域名请求，同一个TCP链接并发完成

				- 1.x  keep alive 串行传输

			- 一个TCP连接分为若干流
			- 一个流可以传输若干消息
			- 每个消息由若干二进制Frame组成

				- 1.x为文本格式

		- Hpack头压缩
		- 二进制传输
		- 服务端推送
		- 解决队头阻塞问题

	- Accept - Encoding

		- 和性能有关，对body部分进行编码，达到压缩的目的
		- 编码类型

			- gzip

				- 好处

					- 节省空间

				- 弊端

					- JPEG这类文件用gzip压缩的不够好

			- compress
			- deflate

				- zlib

	- websocket

		- 使用HTTP 101状态码进行握手
		- 持久性连接
		- 双向通信
		- 依赖TCP协议

			- 同HTTP

		- 使用HTTP  Upgrade头

			- 从HTTP协议更改为WebSocket协议

		- 优点

			- 较少的控制开销
			- 更强的实时性
			- 持久性
			- 更好的二进制支持

	- 异步请求和同步请求的区别

		- 异步请求

			- 并行处理
			- 不等待

		- 同步请求

			- 顺序处理
			- 等待

	- cookie  & session

		- cookie

			- 服务器在本地机器上存储的小段文本
			- 只能保管ASCII字符串
			- 受浏览器安全策略限制
			- 而Cookie保管在客户端，不占用服务器资源

		- session

			- 服务器端的机制
			- 任何类型的数据
			- Session存储在服务器上，对客户端是透明的，不存在敏感信息泄露的风险
			- Session是保管在服务器端的，每个用户都会产生一个Session。假如并发访问的用户十分多，会产生十分多的Session，耗费大量的内存

	- https？

		- 对称加密 + 证书颁发机构CA
		- https的信任基于预先安装在浏览器中的证书颁发机构

			- 我信任证书颁发机构我应该信任的

		- HTTPS报文中的任何东西都被加密，包括所有报头和荷载。
		- 和http的差异

			- 端口

				- http

					- 默认80端口

				- https

					- 默认443端口

		- 加密

			- 对称加密

				- 加、解密用同一串秘钥
				- 只有一个私钥

			- 非对称加密

				- 公钥、私钥
				- 效率低

			- 中心化加密
			- 去中心化加密

		- https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/74
		- get

			- 参数也是加密的

		- 加密层：SSL/TSL

	- 请求方式

		- get和post区别

			- 同

				- TCP链接
				- 底层是TCP/IP
				- GET和POST能做的事情是一样的

			- 定义

				- get

					- Get是向服务器发索取数据的一种请求

				- post

					- Post是向服务器提交数据的一种请求

			- 不同

				- 长度

					- get

						- 无长度限制

							- 但是浏览器会对URL厂区做出限制，2000多个字符

					- post

						- 无长度限制

							- 大多数服务器最多处理64K大小的url

				- 字符

					- get

						- ASCII字符

					- post

						- 没有限制

				- 编码

					- get

						- application/x-www-form-urlencoded

					- post

						- POST支持多种编码方式

				- 安全

					- get

						- GET参数直接暴露在URL上

					- post

						- POST参数在HTTP消息主体中
						- 不会被保存在浏览器历史

				- 缓存

					- get

						- 请求会被浏览器主动缓存

					- post

						- POST不会

				- 浏览器

					- GET请求参数会被完整保留在浏览器历史记录里
					- 而POST中的参数不会被保留

				- 建立过程？

					- 产生一个TCP数据包

						- 浏览器会把http header和data一并发送出去，服务器响应200（返回数据）

					- 产生两个TCP数据包

						- 浏览器先发送header，服务器响应100 continue
						- 浏览器再发送data，服务器响应200 ok（返回数据）

					- https://zhuanlan.zhihu.com/p/25028045

			- https://www.zhihu.com/question/20552352

		- 请求类型

			- get
			- post

				- 创建

			- put

				- 更新

			- delete
			- head

				- 仅仅返回相应的头部，没有具体的响应体。它也不会对服务器造成其他影响

			- TRACE
			- options

				- OPTIONS允许客户端请求一个服务所支持的请求方法。它所对应的响应头是Allow，它非常简洁地列出了支持的方法。下面为服务端成功处理了OPTIONS请求后，响应的内容：
				- Allow: HEAD,GET,PUT,DELETE,OPTIONS
				- 发生时机？

			- connect
			- 用途？

	- 跨域携带cookie

- TCP/IP

	- 全双工通信

		- 输入通道
		- 输出通道

	- 协议集

		- 应用层
		- 传输层
		- 网络层
		- 网络访问层

	- 握手 & 分手

		- 建立连接的最小安全次数
		- 三次握手

			- 1 客户端 发起请求

				- 等待确认

			- 2 服务器收到消息 & 发送确认请求

				- 等待状态

			- 3 客户端收到消息，发送确认包

				- 连接建立

		- 四次分手

			- 1 客户端提出分手请求
			- 2 服务端收到请求，关闭连接
			- 3 并提出反方向关闭请求
			- 4 客户端对服务端请求确认，双方向的关闭结束

		- 断开连接时服务器和客户端均可以主动发起断开TCP连接的请求

### 前端监控

采集阶段、
储存阶段、
分析阶段、
报警阶段

- 行为（数据）监控

	- PV/PU(点击量/不同IP人数)
	- 用户在每个页面的停留时间
	- 用户通过什么入口访问该页面
	- 用户在相应的页面中触发的行为

- 异常监控

	- 1.服务端异常，2.浏览器抛出异常，3.样式加载异常

- 性能监控

	- 不同用户、机型、系统下的首屏加载时间
	- 白屏（骨架屏）时间
	- http等请求的响应时间
	- 静态资源整体下载时间
	- 页面渲染时间
	- 页面交互动画完成时间

### 前端性能

根据性能监测的结果可以进一步的去优化前端性能，比如兼容低版本浏览器的动画效果，加快首屏加载等

- 性能指标

	- 首次绘制（FP）
	- 首次内容绘制（FCP）
	- 首次有效绘制（FMP）
	- 每秒传输帧数（FPS）
	- DNS解析时间
	- TCP连接时间
	- HTTP请求响应时间
	- 用户可交互时间

- 评估工具

	- Page Speed
	- Lighthouse
	- Chrome dev tools

- 性能优化

	- 页面加载链路优化

		- 网络

			- 缓存技术
			- 负载均衡
			- 压缩
			- 优化协议（HTTP,HTTP2.TCP/IP）
			- CDN
			- HTTP请求数量

		- 资源

			- 分包
			- 压缩
			- 懒加载
			- 缓存
			- 热加载&离线包

		- 首屏

			- 首屏处理
			- 外壳处理
			- 拆分过程，并行处理

		- 构建

			- 压缩
			- 分包
			- tree shaking
			- aot
			- 并行处理

	- runtime优化

		- 容器

			- WKWebview
			- V8

				- 内联类

			- wasm
			- RN
			- canvas
			- webgl
			- 硬件加速

		- 语言层面

			- CSS
			- JS

		- 框架层面
		- 视觉

			- 动画

		- 交互

			- 避免重排重绘
			- fastclick

				- 解决问题

					- 300ms延迟

						- 原因

							- 移动浏览器存在双击缩放或双击放大操作
							- 第一次点击之后，系统需要等待300ms，以判断用户是否再次点击了屏幕

				- 事件发生顺序

					- touchstart
					- touchmove
					- touchend
					- click

				- 解决方法

					- 禁用缩放

						- user-scalable=no
						- 但同时也禁用了双指缩放操作

					- 更累默认视口宽度

						- <meta name="viewport" content="width=device-width"></code>
						- 仍可进行双指缩放操作

					- 指针事件

						- pointerdown事件
						- css touchaction: none

							- 是否触摸操作会触发用户代理的默认行为

					- zepto tap

						- document
						- touch事件
						- 计算时间和位置差

					- fastlick

						- 监听touchend
						- 发出自定义click事件
						- 把原来的click事件阻止掉

### 安全

- HTTP劫持与对策

	- https

- DOS攻击

	- 阻断服务攻击
	- 使网络和系统资源耗尽

- XSS攻击与防御

	- 含义

		- 跨站脚本攻击

	- 方法

		- 恶意将未经过滤的代码植入到页面中

	- 分类

		- 反射性

			- URL到页面

		- 持久型

			- 数据库

	- 避免

		- 常见符号编码转换

			- & < > " ' /

		- 对诸如<script>、<img>、<a>等标签进行过滤
		- HttpOnly

			- 避免cookie劫持

	-  HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等，所需要的转义规则不一致。 业务 RD 需要选取合适的转义库，并针对不同的上下文调用不同的转义规则。

- CSRF攻击

	- 跨站请求伪造

		- 攻击者盗用了用户的身份，以用户的名义发送恶意请求
		- 在不同的domain下，攻击者却能为造出”用户本人发出的request“

	- 避免

		- 关键请求使用验证码或者token机制
		- 验证码
		- 在HTTP 头中自定义属性并验证
		- Cross Site

			- 验证 HTTP Referer 字段
			- 具体来说就是服务器每次返回客户端页面的时候，在页面中埋上一个token字段

		- SameSite

	- 参考

		- https://blog.techbridge.cc/2017/02/25/csrf-introduction/

	- 有了同源策略，为什么还会发生csrf

		- http://tech.jiu-shu.com/Web-Applications-Technologies/web-security-csrf

- 接口如何防刷

	- 在nginx代理层控制IP限制调用次数
	- 验证码
	- 人机验证

## 浏览器

### 同源策略

- 定义

	- 限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制

- 协议，端口（如果有指定）和域名

### 缓存策略

- 分类

	- DNS缓存
	- CDN缓存
	- 浏览器缓存

		- 强缓存

			- cache-control

				- no-cache 
				- max-age=<seconds>

			- expires

		- 协商缓存

			- Last-Modify
			- ETag

### 渲染引擎

- KHTML
- Webkit

	- 排版引擎
	- 01年开始苹果
	- 组件

		- JS Core
		- webcore
		- Drosera

			- 调试工具

	- 组成

		- 渲染引擎

			- HTML解释器
			- CSS解释器
			- 布局

- Blink

	- blink

		- 13年，webkit的分支
		- V8

### 事件模型

- DOM0级模型

	- 事件不会传播，即没有事件流的概念
	- btn.onclick = fun;

- DOM2级模型

	- W3C标准模型
	- 三个阶段

		- 捕获
		- 目标
		- 冒泡

### WebGL渲染的过程？

### 页面加载

- HTMl

	- 下载
	- 解析
	- 合并渲染

- CSS

	- 下载
	- 解析
	- 合并渲染

- JS

	- 下载
	- 解释和执行

### 内存管理

- 概念

	- 像C语言一般都有自己的内存管理接口，JS创建变量时分配内存，而不再使用时再释放内存。
	- 在定义变量时完成内存分配

- 方法

	- 引用计数

		- 问题定义

			- 对象有没有其它对象引用它

		- 优势

			- 算法简单
			- 释放时间快

		- 劣势

			- 循环引用问题
			- 对计数要求高
			- 不能并行计算

	- 标记清除

		- 问题定义

			- 对象是否可获得

		- 从根部开始遍历，找出不再使用的变量
		- 阶段

			- 初始阶段
			- 标记阶段

				- JS会停止运行

			- 清楚阶段

		- V8

			- 增量标记

- 堆内存

	- 全局变量
	- 对象的引用
	- 事件
	- 定时器

- 堆和栈的区别

	- 堆

		- 动态分配的内存，大小不定也不会自动释放
		- JS中引用类型占据空间大、大小不固定，栈内存中存放地址指向堆内存中的对象。按引用访问

	- 栈

		- 自动分配的内存空间，由系统自动释放
		- 基本类型占据空间小、大小固定，值保存在栈空间。按值来访问

- 内存泄漏实例？

### 浏览器和Node事件循环的区别

- https://muyiy.cn/question/browser/25.html

### JS引擎

- JS 引擎

	- 下载源代码

		- 并行解析
		- 字节码缓存

	- AST
	- 字节码
	- JIT
	- 机器码，执行

### 输入URL到页面渲染的经历

- http://fex.baidu.com/blog/2014/05/what-happen/

### HTML加载过程？

- 输入地址，返回HTML，解析
- 解析DOM

	- 遇到body标签

		- 加载并渲染DOM

	- 浏览器遇到dom元素时，正常顺序加载，边加载边渲染
	- CSS

		- 内联CSS

			- 浏览器继续加载，但渲染被阻塞
			- 生成新的CSS Rule Tree
			- 生成后重新渲染界面

		- 外联CSS

			- 并行下载
			- 不会阻止DOM树解析
			- CSS继续下载
			- 会阻止渲染

	- JS

		- 内联Javascript

			- DOM的加载和渲染同时被阻塞

				- 由于JavaScript有可能会更改DOM Tree和Render Tree，因此同时被阻塞

		- 外联Javascript

			- DOM的加载和渲染同时被阻塞

		- 现代浏览器并行下载JS文件，以增强下载过程。但是他们也按照dom中出现的顺序解释和执行JS。
		- 

- render tree
- layout
- 文档碎片？

	- 内存
	- 合成一个DOM？

### 渲染过程

- JS触发reflow？

	- 过程

		- JS影响Dom

			- 影响DOM变化，dom树变化并解析

		- JS影响到CSS

			- 影响css变化，css树变化并解析

		- 两树合并

			- 生成一个渲染树，记录每个节点的布局和样式信息

		- layout or reflow (option)

			- 计算每个 DOM 元素最终在屏幕上显示的大小和位置

		- Paint

			- 为每个dom填充像素

				- 本质上就是填充像素
				- 一个DOM的所有可能效果
				- 这个绘制过程是在多个层上完成的。

			- Composite

				- 渲染层合并

					- 在每个层上完成绘制过程之后，浏览器会将所有层按照合理的顺序合并成一个图层，然后显示在屏幕上

				- 完成绘制之后，浏览器会按照所有层顺序，合理的合并成一个图层，显示在屏幕上
				- 某些特殊的渲染层会被认为是合成层（Compositing Layers），合成层拥有单独的 GraphicsLayer，

			- 调用图形接口

	- 扩展

		- 某些特殊的渲染层会被认为是合成层（Compositing Layers），合成层拥有单独的 GraphicsLayer，而其他不是合成层的渲染层，则和其第一个拥有 GraphicsLayer 父层公用一个。
		- 每个 GraphicsLayer 都有一个 GraphicsContext，GraphicsContext 会负责输出该层的位图，位图是存储在共享内存中，作为纹理上传到 GPU 中，最后由 GPU 将多个位图进行合成，然后 draw 到屏幕上，此时，我们的页面也就展现到了屏幕上。

	- http://taobaofed.org/blog/2016/04/25/performance-composite/
	- 
	- 

- 层压缩

	- 原因

		- 大量合成层来，而每个合成层都要消耗 CPU 和内存资源，岂不是严重影响页面性能

## 计算机基础

### 计算机网络

https://www.cnblogs.com/zyxnhr/p/11055797.html#_label0_1

- OSI七层模型

	- 应用层

		- HTTP，FTP，DNS,  SMTP，SNMP

	- 表示层
	- 会话层
	- 传输层

		- TCP，UDP

	- 网络层

		- 	IP，ICMP，OSPF，EIGRP，IGMP

	- 数据链路层

		- 	SLIP，CSLIP，PPP，MTU

	- 物理层

		- ISO2110，IEEE802，IEEE802.2

- 五层协议的体系结构

### 操作系统

- 常用PC

	- Linux
	- Windows
	- Mac OS
	- UNIX

- 常用Mobile

	- Android
	- IOS

### 数据结构

- 堆（Heap）
- 栈（Stack）
- 队列（Queue）
- 链表（Linked List）
- 数组（Array）
- 树（tree）
- 集合（Set）
- 哈希表（Map）

### 算法

- 排序

	- 冒泡排序
	- 插入排序
	- 快速排序
	- 选择排序
	- 希尔排序
	- 归并排序
	- 堆排序

- 检索

	- 线性查找
	- 二分查找
	- 索引
	- 深度优先搜索（DFS）
	- 广度优先搜索（BFS）

- Diff

	- Element Diff
	- Tree Diff
	- Component Diff

*XMind - Trial Version*