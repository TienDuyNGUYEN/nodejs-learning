
function abacaba() {
    return{
      a: 'b'
    }
}

console.log(abacaba());
console.log(Math.abs(0.1+0.2)-Math.abs(0.3) <=0.0000001)
// the function itself
function getData(callback, errorCallback) {
    try {
      // Do some network/api stuff...
      callback(result)
    } catch (e) {
      errorCallback(e);
    }
  }
  
  // Here is how you would use it:
  getData(result => console.log(result), error => console.error(error));
  
  // Here is how to create a Promise-based function from it:
  
  function getDataAsync() {
    return new Promise((resolve, reject) => {
      getData(resolve, reject);
    });
  }
  
  getDataAsync()
    .then(result => console.log(result))
    .catch(error => console.error(error));
  
  // OR
  
  async function main() {
    const result = await getDataAsync();
    console.log(result)};