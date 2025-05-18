const validator = require("validator");

const validateSIgnup = (req) => {
  const { firstName, lastName, email, password } = req;
    console.log(firstName)
  if (!firstName || !lastName) throw new Error("Invalid user name");
  else if (firstName.length < 4 || firstName.length > 50)
    throw new Error("Length error");
  else if (!validator.isStrongPassword(password))
    throw new Error("please enter a strong password");
  else if (!validator.isEmail(email))
    throw new Error("please enter a valid");
};


module.exports = { validateSIgnup }