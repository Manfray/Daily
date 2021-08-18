//
// 青蛙跳台阶，每次只能挑一级或者两级，输入台阶n，返回跳法
// 递归算法
// f(1) = 1
// f(2) = 2
// f(n) = f(n-1) + f(n-2) // n > 2

function getFragJumpWays(number) {
  if (number === 1) {
    return 1
  } else if (number === 2) {
    return 2
  } else {
    return getFragJumpWays(number - 1) + getFragJumpWays(number - 2);
  }
}

// 快排
function quickSort(arr) {
  // 取第一个作为基准数
  let baseNum = arr[0]
  let leftArr = []
  let rightArr = []
  // 通过与arr剩余选项比较，生成一个比基准数大的集合和一个比基准数小的集合
  for (let index = 1; index < arr.length; index++) {
    // 递归停止条件，生成的集合长度等于1
    if (arr[index] <= baseNum) {
      leftArr.push(arr[index])
    } else {
      rightArr.push(arr[index])
    }
  }
  if (leftArr.length > 1) leftArr = quickSort(leftArr)
  if (rightArr.length > 1) rightArr = quickSort(rightArr)
  // 返回排序后的数组
  return [...leftArr, baseNum, ...rightArr]
}
function maopaoSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

// 选择排序
function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        let temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr
}

// 插入排序
function insertSort(arr) {
  let resArray = [arr[0]]
  let n = 1
  while(n < arr.length) {
    // arr[n] 与 resArray 中每一个比较
    for (let i = 0; i < resArray.length; i++) {
      if (resArray[i] >= arr[n]) {
        resArray.splice(i, 0, arr[n])
        break
      } else if (resArray[i + 1] > arr[n] || resArray[i + 1] === undefined) {
        resArray.splice(i + 1, 0, arr[n])
        break
      }
    }
    n++
  }
  return resArray
}
console.log(insertSort([2,4,3,1,7,5,8,6,9,0]))

// 判断回形文字
function judgeHui(str) {
  if (str.length > 1) {
    let start = str.slice(0,1)
    let end = str.slice(-1)
    let mid = str.slice(1, -1)
    if (!(start === end)) {
      return false
    } else {
      return judgeHui(mid)
    }
  }
  return true
}
console.log(judgeHui('123454331'))

// 快排
function quickSort(arr) {
  // 找基数
  // 跟基数比较，小的放左边，大的放右边
  // 针对左边，右边继续递归返回
  let baseNum = arr[0]
  let leftArr = []
  let rightArr = []
  for (let i = 1; i < arr.length; i++) {
    arr[i] > baseNum ? rightArr.push(arr[i]) : leftArr.push(arr[i])
  }
  if (leftArr.length)  quickSort(leftArr)
  if (rightArr.length)  quickSort(rightArr)

  return [...leftArr, baseNum, ...rightArr]
}

// 递归就要递下去，然后归一