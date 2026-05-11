const numbers = [2, -5, 0, 7, -3, 0, 10, -8, -6];
let positiveCount = 0;
let negativeCount = 0;
let zeroCount = 0;
for (const value of numbers) {
  if (value === 0) {
    zeroCount++;
  } else if (value > 0) {
    positiveCount++;
  } else (value < 0) {
    negativeCount++;
  }
}
console.log(`Кількість нульових чисел: ${zeroCount}`);
console.log(`Кількість позитивних чисел: ${positiveCount}`);
console.log(`Кількість негативних чисел ${negativeCount}`);
