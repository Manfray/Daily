var obj = {
  counter: 3
};
function incCounter() {
  obj.counter++;
}
module.exports = {

  obj,
  getCounter () {
    return obj.counter
  },
  incCounter
};