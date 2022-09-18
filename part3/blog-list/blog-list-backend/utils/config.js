require("dotenv").config();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)
module.exports = {
  PORT,
  MONGODB_URI,
};
