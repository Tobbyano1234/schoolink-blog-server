
function cb(x, fn) {
  fn();
  return x;
}

console.log(
  cb(
    11, () => {console.log('callback function')}
  )
);
const asyncFn = () => {
  return new Promise((resolve, _reject) =>
  setTimeout(() => {
    console.log('async function callback');
    return resolve();
  }, 500))
}

console.log(
  cbAsync(
    7, async () => {asyncFn()}
  )
);

function cbAsync(x, fn) {
  fn();
  return x;
}

// async function ss () {
//   cbAsync(); // Promise object
//   const d = await cbAsync( );
// }
