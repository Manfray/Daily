//
// 树结构转扁平化数据
// 扁平化数据转树结构
const treeData = [
    {
      id: 1,
      title: "课程1",
      children: [
        { id: 4, title: "课程1-1" },
        {
          id: 5,
          title: "课程1-2",
          children: [
            { id: 6, title: "课程1-2-1" },
            { id: 7, title: "课程1-2-2" },
          ],
        },
      ],
    },
    { id: 2, title: "课程2" },
    { id: 3, title: "课程3" },
  ];
  const flatData = [
    { id: 1, parent: 0, title: "课程1" },
    { id: 4,parent: 1, title: "课程1-1" },
    { id: 5,parent: 1, title: "课程1-2" },
    { id: 6,parent: 5, title: "课程1-2-1" },
    { id: 7,parent: 5, title: "课程1-2-2" },
    { id: 2,parent: 0, title: "课程2" },
    { id: 3,parent: 0, title: "课程3" },
  ]
  const flatData = [
    { id: 1,pid: 0, title: "课程1" },
    { id: 2,pid: 0, title: "课程2" },
    { id: 3,pid: 0, title: "课程3" },
    { id: 4,pid: 1, title: "课程1-1" },
    { id: 5,pid: 1, title: "课程1-2" },
    { id: 6,pid: 5, title: "课程1-2-1" }, // 循环走到这一步的理解很关键，对象存储是引用地址
    { id: 7,pid: 5, title: "课程1-2-2" },
  ]

  function changeFlatToTree(arr) {
    // 入参校验
    if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') throw new Error('params require Array type')
    // f(parent) = {
    //   f(c1),
    //   f(c2),
    //   f(cn)
    // }
    function getChildMap(arr, parentId) {
      const res = []
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].parent === parentId) {
          res.push(arr[i])
        }
      }
      for (let i = 0, len = res.length; i < len; i++) {
        res[i].children = getChildMap(arr, res[i].id)
      }
      return res
    }
    // 返回树结构对象
    return getChildMap(flatData, 0)
  }

  // 答案--------------
  function TreeToFlat(data) { 
    let formatData = []
    for (var i = 0; i < data.length; i++) {
      formatData.push({
        id: data[i].id,
        title: data[i].title,
      })
      if (data[i].children) {
        formatData = formatData.concat(TreeToFlat(data[i].children));
      }
    }
    return formatData;
  }
  console.log(TreeToFlat(treeData),'输出为扁平化结构')

  function FlatToTree(arr) {
    const map = arr.reduce((acc, val) => {
      acc[val.id] = val
      return acc
    }, {})
    const tree = []
    arr.forEach(region => {
      if (region.parent) {
        const parent = map[region.parent]
        if (!parent.children) {
          parent.children = [region]
        }
        else {
          parent.children.push(region)
        }
      }
      else {
        tree.push(region)
      }
    })
    return { tree }
  }
  console.log(FlatToTree(flatData),'输出为树形结构')

  // 答案二-------------已经理解，这个方法可以
  function arrayToTree(items) {
    let res = [] // 存放结果集
    let map = {}

    // 先转成map存储
    for (const i of items) {
        map[i.id] = { ...i, children: [] }
    }
    console.log('map', map)
    for (const i of items) {
        const newItem = map[i.id]
        if (i.pid === 0) {
            res.push(newItem)
        } else {
            // if (Object.prototype.hasOwnProperty.call(map, i.pid)) { // 好像没这个必要
            if (map.hasOwnProperty(i.pid)) { // 校验是不是孤儿分支
                map[i.pid].children.push(newItem) // 记住这里是对象，虽然看似只是在map的第一层对象中push了一个children，实际上该对该对象的引用的对象都会修改
            }
        }
    }
    return res
}