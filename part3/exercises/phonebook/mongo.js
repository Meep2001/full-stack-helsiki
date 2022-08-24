const mongoose = require("mongoose");
const url = `mongodb://localhost/phonebookApp`;

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Contact = mongoose.model("Contact", contactSchema);
const mongoosePromise = mongoose.connect(url);
const printAllContacts = () => {
  mongoosePromise.then((result) => {
    console.log("connected");
    Contact.find({}).then((contacts) => {
      contacts.forEach((person) => console.log(`${person.name} ${person.number}`));
      return mongoose.connection.close();
    });
  });
};

const insert = () => {
  const name = process.argv[2];
  const number = process.argv[3];
  mongoosePromise
    .then((result) => {
      console.log("connected");
      const contact = new Contact({
        name,
        number
      });
      return contact.save();
    })
    .then((res) => {
      console.log(`${name} with number ${number} saved to DB`);
      return mongoose.connection.close();
    });
};

if (process.argv.length == 2) {
  printAllContacts();
}
else{
    insert();
}
