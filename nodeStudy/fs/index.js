const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname,'../assets/test.txt')
fs.readFile(filePath, 'utf8', function (err, data) {
    console.log(data)
})