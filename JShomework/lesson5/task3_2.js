const number = 5;
try {
  if (number <= 0 || number > 10) {
    throw new Error("Таблиця множення має бути в діапазоні від 1 до 10!");
  }
  let i = 1;

  while (i <= 10) {
    console.log(`${number} x ${i} = ${number * i}`);
    i++;
  }
} catch (error) {
  console.error("Ой, щось пішло не так!", error.message);
}
