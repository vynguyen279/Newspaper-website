const dotenv =  require("dotenv");
const jwt  = require("jsonwebtoken");
dotenv.config();

module.exports = function getToken(email, role) {
  let minutes = 3600;

  const payload = {
    email,
    role,
    isa: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * minutes,
  };
  const secretKey = 'NewspaperManagement-BCTT-2023';
  const token = jwt.sign(payload, secretKey);

  return token;
}

