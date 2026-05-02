function numberValue(num) {
  if (num <= 0) return;
  console.log(num);
  numberValue(num - 1);
}

numberValue(0);
