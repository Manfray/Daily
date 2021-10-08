var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {

  counter,
  getCounter () {
    return counter
  },
  incCounter
};