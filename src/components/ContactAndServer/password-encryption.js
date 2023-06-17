const bcrypt = require('bcrypt');
const saltRounds = 10;

// Example password to encrypt
const password = 'password';

// Generate a salt (a random string) to use during encryption
const salt = bcrypt.genSaltSync(saltRounds);

// Encrypt the password using bcrypt and the generated salt
const encryptedPassword = bcrypt.hashSync(password, salt);

// Output the encrypted password
console.log(encryptedPassword);
