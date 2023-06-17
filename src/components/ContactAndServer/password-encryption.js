const bcrypt = require('bcrypt');

// Example password to encrypt
const password = 'password';

// Generate a salt (a random string) to use during encryption
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Encrypt the password using bcrypt
const encryptedPassword = bcrypt.hashSync(password, salt);

// Output the encrypted password
console.log(encryptedPassword);
