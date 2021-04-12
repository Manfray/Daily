const cheerio = require('cheerio')
const axios = require('axios');
const express = require('express')
const request = require('request')
const superagent = require('superagent')

const app = express()

// function getData() {
//     let url = 'http://www.ccdi.gov.cn/fgk/law_pagenumb';  // 拼接请求的页面链接
//     request({
//       url, 
//       method: 'POST',
//       formData: {
//         p: 1,
//         validity: '0204'
//       },
//       headers: {
//       'Cookie': 'JSESSIONID=wKiiSR-QYAJisgtZiDBvDUl3kmJO5tx_DCcA; _gscu_1507282980=10769169jygq4y18; _gscbrs_1507282980=1; _gscs_1507282980=10769169on0bvs18|pv:1; _Jo0OQK=4874533F04B662553D194F233952DABF37B813CAC2C3DF58C197935F49661718D0F51A3E251F0FBE03594D417AA5D051EDE9F83CDFAE46E8F04FC375D2BE70DE2A0144A5FBA689A3431B104BCCAE3421E21B104BCCAE3421E21640C56CEADDD145BGJ1Z1eQ==; C3VK=c27fb0',
//         // 'JSESSIONID=wKiiSR-QYAJbEESbbNH88E7DnELz5gVwp5UA;'+
//         // 'C3VK=2fe5f0;'+
//         // '_Jo0OQK=206E3FC3504E520BD1FB64E3794A741FEA04FEC559133CDAABA2C3E4AD101AA765979641C833A02B999EC4B587DFE8A9758DCED3763C18A316FACD888731EA0217E2D223DFBFA6D0505B104BCCAE3421E21B104BCCAE3421E21640C56CEADDD145BGJ1Z1Uw==',
//       'Host': 'www.ccdi.gov.cn',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
//       }
//     }, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         // 输出网页内容
//         console.log(response.request.headers)
//         console.log(body);
//       }
//     })
//     // console.log(res)
//     // return .then(function (response) {
//     //         let html_string = response.data.toString(); // 获取网页内容
//     //         console.log(html_string)
//     //         const $ = cheerio.load(html_string);  // 传入页面内容
//     //         let list_array = [
//     //           {
//     //             id: '01',
//     //             name: "党内法规制度",
//     //             children: []
//     //           },
//     //           {
//     //             id: '02',
//     //             name: "国家法律法规",
//     //             children: []
//     //           }
//     //         ];
//     //         $('[name^=off]').each(function () { // 像jQuery一样获取对应节点值
//     //           const jdom = $(this)
//     //           const linkId = jdom.attr('class')
//     //           const parentLinkId = linkId.slice(2)
//     //           if (parentLinkId === '01') {
//     //             list_array[0].children.push({
//     //               id: linkId,
//     //               name: jdom.find('a').text(),
//     //               children: []
//     //             })
//     //           }
              
//     //         });
//     //         console.log(list_array)
//     //         return Promise.resolve(list_array);

//     //     })
//     //     .catch(function (error) {
//     //         console.log(error);
//     //     })
// }
// 浏览器请求报文头部部分信息
const browserMsg={
  "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
  'Content-Type':'application/x-www-form-urlencoded'
};
const url = 'http://www.ccdi.gov.cn/fgk/law_pagenumb'
let cookie = ""
const mainMessage = []
function getSetCookie() {
  return new Promise(function(resolve, reject) {
      superagent.post(url).set(browserMsg).end(function (err, res) {
          //获取cookie
          cookie = res.headers["set-cookie"];
          resolve(cookie);
      });
  });
}
function getData(num) {
  return new Promise(function(resolve, reject) {
    //传入cookie
    superagent.post(url).set("Cookie",cookie).set(browserMsg).send({
      p: num,
      validity: '0204'
    }).end(function(err,res) {
      //获取或更新cookie
      const temCookie = res.headers["set-cookie"];
      if (temCookie) cookie = temCookie
      console.log('当前cookie: ' + cookie)
      // 获取页面关键信息
      const pageMainMesage = []
      const domtext = res.text.toString().replace(/[\r\n]/g,"")
      const $ = cheerio.load(domtext);
      // console.log($('#searchword').prop('name'))
      // console.log($('dt'))
      // $('dt').each(function () {
      //   pageMainMesage.push({
      //     title: $(this).children('a').prop('title'),
      //     content: $(this).siblings('dd').children('p').text()
      //   })
      // })
      console.log(pageMainMesage)
      resolve({
          message: pageMainMesage,
          text: domtext
      });
    });
  });
}
app.get('/', (req, res) => {
    getSetCookie().then((cookie) => {
      getData(1).then(response => {
        res.json(response); // 数据返回
      });
    })
})


app.listen(3000, () => console.log('Listening on port 3000!'))  // 监听3000端口


// 最后的Low办法
// var text = ''
// $('dt').each(function () {
//     text = text + '部委规章#' + $(this).children('a').prop('title') + '#' + $(this).siblings('dd').find('p').text() + '\n'
// })
// function copyText(text, callback){ // text: 要复制的内容， callback: 回调
//     var tag = document.createElement('input');
//     tag.setAttribute('id', 'cp_hgz_input');
//     tag.value = text;
//     document.getElementsByTagName('body')[0].appendChild(tag);
//     document.getElementById('cp_hgz_input').select();
//     document.execCommand('copy');
//     document.getElementById('cp_hgz_input').remove();
//     if(callback) {callback(text)}
// }
// copyText(text)
// console.log(text)
// 加个自动下载还能省一部分事
