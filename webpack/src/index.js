import _ from 'lodash';
import "./css/index.css"
import test from "./assets/test.txt"
function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  debugger
  console.log(test)
  return element;
}

document.body.appendChild(component());