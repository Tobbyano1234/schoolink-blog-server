const print = console.log;

// the body of the funciton is never executed
// during the declaration of the function
function add(x, y) {
  print('inside body of the function'); // effect
  return x + y;
}

print('outside body of the function'); 
// add(3, 4);
const res = add(3, 4); // an application === evaluting expression

// const d = print(res); // no guarantee 
// print('d ', d) // Error!!!

print('My name is Timi');

const obj = {
  a: add(4, 5), // 7
  b: function (x, y) {
    return x * y;
  },
};


// let x = (5 * 4) / (4 + (6 - 7)) // expression - evalueated
// function literals built in to the language
// * --> multiply
// / --> divide
// + --> plus
// - --> minus

// let y = divide(
//   multiply(5, 4),
//   plus(4, minus(6, 7))
// ); // expression

// assert(x == y)
