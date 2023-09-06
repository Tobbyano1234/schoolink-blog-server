

function myFunc(specificFunc: (msg: string) => void) {}


const correctFunction = (msg: string) => {
  console.log("I am a correct implementation");
};

myFunc(correctFunction); // happy path

const wrongFunction = (msg: string, id: number) => {
  return 5;
};

// myFunc(wrongFunction);

const fixerFunction = (id: number) => {
  // return (msg: string) => {};
  id;
  // id is in scope
  return function(msg: string) {
    id;
  };
};

myFunc(fixerFunction(23));

let id = 2;
myFunc(
  (hh) => {
    id;
  }
);

// function ff (){}




