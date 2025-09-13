function generateSixDigitCode() {
    // Generate a random number between 100000 and 999999
    return Math.floor(100000 + Math.random() * 900000);
}

const code = generateSixDigitCode();
module.exports=generateSixDigitCode;