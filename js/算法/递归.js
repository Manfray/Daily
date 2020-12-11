// 递归生成斐波那契数列
function f(n) {
  if (n === 1) {
    return [1]
  } else if (n ===2) {
    return [1, 1]
  } else {
    let a = f(n-1)
    return [...f(n-1), f(n-1)[n-1-1]+ f(n-1)[n-1-2]]
  }
}
console.log(f(6));

// 递归实现扁平化
function flat(arr) {
  let res = []
  !(function getNumber(arr) {
    const len = arr.length
    for (let index = 0; index < len; index++) {
      if (typeof arr[index] === 'number') {
        res.push(arr[index])
      } else {
        getNumber(arr[index])
      }
    }
  })(arr)
  return res
}
console.log(flat([[2,3],4,[6,[2,3],1],5]))

let Base64 = {
  encode(str) {
      // first we use encodeURIComponent to get percent-encoded UTF-8,
      // then we convert the percent encodings into raw bytes which
      // can be fed into btoa.
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1);
          }));
  },
  decode(str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
      return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  }
};

let encoded = Base64.encode("哈ha"); // "5ZOIaGE="
let decoded = Base64.decode(encoded);