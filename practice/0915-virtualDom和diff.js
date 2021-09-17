// element.js

// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class Element {
  constructor(type, props, children) {
      this.type = type;
      this.props = props;
      this.children = children;
  }
}
// 创建虚拟DOM，返回虚拟节点(object)
function createElement(type, props, children) {
  return new Element(type, props, children);
}

// render方法可以将虚拟DOM转化成真实DOM
function render(domObj) {
  // 根据type类型来创建对应的元素
  let el = document.createElement(domObj.type);
  
  // 再去遍历props属性对象，然后给创建的元素el设置属性
  for (let key in domObj.props) {
      // 设置属性的方法
      setAttr(el, key, domObj.props[key]);
  }
  
  // 遍历子节点
  // 如果是虚拟DOM，就继续递归渲染
  // 不是就代表是文本节点，直接创建
  domObj.children.forEach(child => {
      child = (child instanceof Element) ? render(child) : document.createTextNode(child);
      // 添加到对应元素内
      el.appendChild(child);
  });

  return el;
}

// 设置属性
function setAttr(node, key, value) {
  switch(key) {
      case 'value':
          // node是一个input或者textarea就直接设置其value即可
          if (node.tagName.toLowerCase() === 'input' ||
              node.tagName.toLowerCase() === 'textarea') {
              node.value = value;
          } else {
              node.setAttribute(key, value);
          }
          break;
      case 'style':
          // 直接赋值行内样式
          node.style.cssText = value;
          break;
      default:
          node.setAttribute(key, value);
          break;
  }
}

// 将元素插入到页面内
function renderDom(el, target) {
  target.appendChild(el);
}

export {
  Element,
  createElement,
  render,
  setAttr,
  renderDom
};



// index.js

// 首先引入对应的方法来创建虚拟DOM
import { createElement } from './element';

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])
]);

console.log(virtualDom);

// 为什么要用virtualDom 和 diff，直接用新dom来渲染nodetree不好吗？
// 场景：
// 1、一个事件中会针对一个dom节点进行多处修改
// 2、一个事件对dom节点多次重复修改

// 能说服自己的解释:
// 一次更新可能提现不出来差别，但是如果修改多处dom，传统的会采用多次get元素，更新其dom, 但是VDOM可以做到，一次找到这个dom，并对他及其子元素进行多次操作，而不会重复多次的去访问dom
// VDOM可以避免多次找dom进行修改，diff则可以找到指定位置进行修改，而不用整体修改

// vue重新计算dom的时机是什么时候
// 个人觉得应该是浏览器渲染dom的时机之前