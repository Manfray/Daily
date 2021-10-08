var mod = require('./lib2');
console.log(mod.obj.counter);  // 3
mod.incCounter();
console.log(mod.obj.counter); // 3
console.log(mod.getCounter()); // 3