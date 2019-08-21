/* eslint-disable no-undef */
const naturalPersons = require('./naturalPersons');

test('naturalPersons module test calculation', () => {
  const payment1 = {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 800, currency: 'EUR' }
  };
  const payment2 = {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 500, currency: 'EUR' }
  };
  const payment3 = {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100, currency: 'EUR' }
  };
  const payment4 = {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1100, currency: 'EUR' }
  };
  const payment5 = {
    date: '2016-01-13',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000, currency: 'EUR' }
  };
  const precent = 0.3;
  const limit = 1000;

  expect(naturalPersons(payment1, precent, limit)).toEqual('0.00');
  expect(naturalPersons(payment2, precent, limit)).toEqual('0.90');
  expect(naturalPersons(payment3, precent, limit)).toEqual('0.30');
  expect(naturalPersons(payment4, precent, limit)).toEqual('0.30');
  expect(naturalPersons(payment5, precent, limit)).toEqual('0.00');
});
