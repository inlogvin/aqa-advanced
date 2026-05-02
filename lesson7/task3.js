function divide(numerator, denominator) {
  if (
    denominator === 0 ||
    typeof numerator !== "number" ||
    typeof denominator !== "number"
  ) {
    throw new Error(`Приймаються тільки числа > 0`);
  }
  return numerator / denominator;
}

function safeDivide(numerator, denominator) {
  try {
    console.log(`Частка: ${divide(numerator, denominator)}`);
  } catch (error) {
    console.error(`Щось пішло не так! ${error.message}`);
  } finally {
    console.log(`Робота виконана, з вас 50$`);
  }
}
safeDivide(20, 0);
safeDivide(null, 5);
safeDivide(9, 2);
