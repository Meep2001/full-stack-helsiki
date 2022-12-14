require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 10,
    required: true,
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected");
  })
  .catch((error) =>
    console.log("could not connect with the db:", error.message)
  );

module.exports = mongoose.model("Contact", contactSchema);
