# Pay 

Payement fees calculation system created for task.<br/>
Code has [Airbnb style guide](https://github.com/airbnb/javascript) compatible.<br/>
Progam has the [Jest](https://github.com/facebook/jest) - JavaScript Testing Framework .


## Installation

Install system using npm:<br/>
`npm install`

## Usage

Run the program:<br/>
`node app.js input.json`<br/>
input.json is file with all payments. Depends on payments types and amounts program will output fees. File can be in different name but must exist, be in JSON format and payment structure.<br/>
Payment structure example:<br/>
```
{
    "date": "2016-01-05",
    "user_id": 1,
    "user_type": "natural",
    "type": "cash_in",
    "operation": { "amount": 200.0, "currency": "EUR" }
 }
```

## Test

Run the test:<br/>
`npm test`<br/>
Progam has 3 different modules for each fee type and it can be tested with various options and inputs.<br/>
Test in output give answer if test is passed.
