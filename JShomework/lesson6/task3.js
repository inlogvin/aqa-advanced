console.log(checkOrder(0, 0));
console.log(checkOrder(78, 0));
console.log(checkOrder(9, 23));
console.log(checkOrder(10, 5));

function checkOrder(available, ordered) {
  if (ordered === 0) {
    return "Your order is empty";
  }
  if (available <= ordered) {
    return "Your order is too large, we don’t have enough goods";
  }
  return "Your order is accepted";
}
