/* eslint-disable no-undef */
const legalPersons = require('./legalPersons');

test('legalPersons module test calculation', () => {
  const payment = {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' }
  };
  const precent = 0.3;
  const min = 0.5;

  expect(legalPersons(payment, precent, min)).toEqual('0.90');
});
