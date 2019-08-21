/* eslint-disable no-undef */
const cashIn = require('./cashIn');

test('cashIn module test calculation', () => {
  const payment = {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'EUR' }
  };
  const precent = 0.03;
  const max = 5;

  expect(cashIn(payment, precent, max)).toEqual('0.06');
});
