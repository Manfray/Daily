// 
// 算法练习
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
function getIndexs(nums, target) {
  // 参数校验 。。。
  const res = []
  // 遍历nums，双指针
  for (let i = 0, len = nums.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) res.push([i, j])
    }
  }
  // 找不到
  if (res.length === 1) {
    return res[0]
  } else {
    return res
  }
}
getIndexs([1,3,2,5,4,7,6,8,3], 9)

// 四分钟一次性通过

