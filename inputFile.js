const fs = require('fs');

const inputFile = {
  name: '',
  inputData: '',
  getInputName: () => {
    this.name = process.argv.slice(2, 3).toString();
  },
  checkExist: () => {
    if (!fs.existsSync(this.name)) {
      throw new Error('File does not exist!');
    }
  },
  readInput: () => {
    this.inputData = fs.readFileSync(this.name);
  },
  checkValid: () => {
    try {
      JSON.parse(this.inputData);
    } catch (e) {
      throw new Error('File is not JSON format!');
    }
  },
  getData: () => {
    // Get input file name from command line
    inputFile.getInputName();
    // Check if file exist in folder
    inputFile.checkExist();
    // Load file data
    inputFile.readInput();
    // Check if file data is JSON
    inputFile.checkValid();
    return JSON.parse(this.inputData);
  }
};

module.exports = inputFile.getData;
