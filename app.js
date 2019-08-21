// Load functions
const inputFile = require('./inputFile');
const getAPI = require('./getAPI');
const cashIn = require('./cashIn');
const naturalPersons = require('./naturalPersons');
const legalPersons = require('./legalPersons');

// Load JSON file
let inputData = inputFile();

// Check if Object is in Array if not put him in array
if (!Array.isArray(inputData)) {
  inputData = [inputData];
}

// Get Commission Fees API data
const cashInUrl =
  'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in';
const naturalPersonsUrl =
  'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural';
const LegalPersonsUrl =
  'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical';

const cashInData = getAPI(cashInUrl);
const naturalPersonsData = getAPI(naturalPersonsUrl);
const LegalPersonsData = getAPI(LegalPersonsUrl);

// Declare types

const userTypes = ['cash_in', 'cash_out'];
const cashOutTypes = ['natural', 'juridical'];

// Go throw all JSON input data
inputData.forEach(operation => {
  // Check what is type of operation
  switch (operation.type) {
    // Case when type is Cash In
    case userTypes[0]:
      // send - operation data and fee criterions, get - calculated tax
      process.stdout.write(
        `${cashIn(operation, cashInData.percents, cashInData.max.amount)}\n`
      );
      break;
    // Case when type is Cash out
    case userTypes[1]:
      // Check if Cash out type is natural
      if (operation.user_type === cashOutTypes[0]) {
        // send - operation data and fee criterions, get - calculated tax
        process.stdout.write(
          `${naturalPersons(
            operation,
            naturalPersonsData.percents,
            naturalPersonsData.week_limit.amount
          )}\n`
        );
        // Check if Cash out type is juridical
      } else if (operation.user_type === cashOutTypes[1]) {
        // send - operation data and fee criterions, get - calculated tax
        process.stdout.write(
          `${legalPersons(
            operation,
            LegalPersonsData.percents,
            LegalPersonsData.min.amount
          )}\n`
        );
      }

      break;
    default:
      break;
  }
});
