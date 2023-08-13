const dotenv =  require("dotenv");
const jwt  = require("jsonwebtoken");
dotenv.config();

module.exports = function getToken(email, role) {
  let minutes = 3600;

  const payload = {
    email: email,
    role: role,
    isa: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * minutes,
  };
  const secretKey = 'NewspaperManagement-BCTT-2023';
  const token = jwt.sign(payload, secretKey);

  return token;
}

// module.exports = function getRefeshToken(email, role = "customer") {
//   let minutes = 4320;
//   const refreshToken = jwt.sign(
//     {
//       email,
//       role,
//       isa: Math.floor(Date.now() / 1000),
//       exp: Math.floor(Date.now() / 1000) + 60 * minutes,
//     },
//     process.env.JWT_SECRET
//   );

//   console.log("maked refesh token:", email, role, refreshToken);

//   return refreshToken;
// }