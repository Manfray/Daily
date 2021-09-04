//
// 下面的代码可以生成指定深度和每层广度的代码
// 生成指定深度广度的对象
function createTreeData(deep, breadth) {
  // 入参只能为数字
  // 返回对象
  let obj = {}
  function cd(obj) { // 递：对象，归：展开的每一层，
    for (let i = 0; i < deep; i++) {
      for (let j = 0; j < breadth; j++) { // 生成广度
        obj.j = j
      }
      obj.data = {}
      obj.data = cd(obj.data)
    }
  }
  return obj
}
// 一遍没写出来、、、
// 看完样例后用循环
function createTreeData(deepNum, breadthNum) {
  const res = {}
  let temp = res
  for (let i = 0; i < deepNum; i++) {
    temp.data = {}
    for (let j = 0; j < breadthNum; j++) {
      temp[j] = j
    }
    temp = temp.data
  }
  return res
}
createTreeData(3,3)
// 坚持用递归解决了，但是这个意义不大，因为这个函数本身就是想测试爆栈，而方法递归本身就会存在爆栈问题
function createTreeData(deepNum, breadthNum) {
  const res = {}
  let deepNumCompute = deepNum
  // 传递下去一个空对象，返回一个指定对象
  function dgFn(obj) {
    if (deepNumCompute === 0) {
      return obj
    } else {
      for (let j = 0; j < breadthNum; j++) {
        obj[j] = j
      }
      deepNumCompute--
      obj.data = dgFn({})
      return obj
    }
  }

  return dgFn(res)
}

// 别人写的
function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for (var i = 0; i < deep; i++) {
      temp = temp['data'] = {};
      for (var j = 0; j < breadth; j++) {
          temp[j] = j;
      }
  }

  return data;
}

createData(1, 3); // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}
