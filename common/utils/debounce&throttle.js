/**
 * 防抖之延迟执行
 * @param {function} func 受保护的方法
 * @param {number} wait 保护时长（ms）
 */
export const debounceDelay = (func, delay = 1000) => {
  let timer = null
  return function () {
    // 延迟执行版本
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => { // 箭头函数、先this复制再传参、bind都可以修改函数this指向
      // 通过apply改变this指向，及参数传递
      func.apply(this, arguments)
    }, delay)
  }
}
/**
 * 防抖之立即执行
 * @param {function} func 受保护的方法
 * @param {number} delay 保护时长(ms)
 */
export const debounceImmed = (func, delay = 1000) => {
  let timer = null
  return function () {
    // 立即执行版本
    if (timer === null) {
      func.apply(this, arguments)
    } else if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}
/**
 * 函数节流
 * @param {function} func 受保护方法
 * @param {number} wait 节流时间间隔
 */
export const throttle = (func, wait = 1000) => {
  let timer = null
  return function () {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
      }, wait)
    }
  }
}

/**
 * 函数节流(时间戳版本)
 * @param {function} func 受保护方法
 * @param {number} wait 节流时间间隔
 */
export const throttleByTime = (func, wait = 1000) => {
  let previous = 0
  return function () {
    const now = Date.now()
    if (now - previous > wait) {
      func.apply(this, arguments)
      // 执行func后更新前一个时间戳
      previous = now
    }
  }
}