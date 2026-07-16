function handleEven(number) {
  console.log(`${number} number is even`);
}

function handleOdd(number) {
  console.log(`${number} number is odd`);
}

function handleNum(numbValue, funcEven, funcOdd) {
  if (numbValue % 2 === 0) {
    funcEven(numbValue);
  } else {
    funcOdd(numbValue);
  }
}
handleNum(9, handleEven, handleOdd);
handleNum(4, handleEven, handleOdd);
