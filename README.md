# Pay 

Payement fees calculation system created for task.<br/>
Code has [Airbnb style guide](https://github.com/airbnb/javascript) compatible.<br/>
The system has implemented the [Jest](https://github.com/facebook/jest) - JavaScript Testing Framework .


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

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

