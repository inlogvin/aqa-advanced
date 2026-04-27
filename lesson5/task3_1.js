const number = 15;

try {
  if (number <= 0 || number > 10) {
    throw new Error("Таблиця множення має бути в діапазоні від 1 до 10!");
  }
  for (let i = 1; i <= 10; i++) {
    console.log(`${number} x ${i} = ${number * i}`);
  }
} catch (error) {
  console.error("Щось пішло не так!", error.message);
}
