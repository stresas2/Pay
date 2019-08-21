const legalPersons = (operation, percents, minFee) => {
  // Get operation amount value
  const { amount } = operation.operation;
  const realPercents = percents / 100;
  // calcalute tax
  let price = amount * realPercents;
  if (price < minFee) {
    price = 0.5;
  }
  price = (Math.ceil(price * 100) / 100).toFixed(2);
  return price;
};

module.exports = legalPersons;
