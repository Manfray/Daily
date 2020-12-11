/**
 * cookie相关
 */
export const setCookie = function (cname, cvalue, exhours) {
  var d = new Date()
  d.setTime(d.getTime() + (exhours * 60 * 60 * 1000))
  var expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}
export const deleteCookie = function (cname) {
  document.cookie = cname + '=' + ';expires=Thu, 01 Jan 1970 00:00:00 GMT'
}
export const getCookie = function (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(name) === 0) { return c.substring(name.length, c.length) }
  }
  return ''
}