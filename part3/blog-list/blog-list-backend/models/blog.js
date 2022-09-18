const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");

const url = config.MONGODB_URI;

logger.info("connecting to ", url);

const connectToDB = async () => {
  const promise = new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then((result) => {
        logger.info("connected to mongodb");
        resolve(true);
      })
      .catch((error) => {
        logger.error("error connecting to mongodb", error.message);
        reject(false);
      });
  });

  await promise;
};

connectToDB()
  .then((r) => {})
  .catch((e) => {});

const blogSchema = new mongoose.Schema({
  title: { type: String, minLength: 5, required: true },
  author: { type: String, minLength: 5, required: true },
  blogUrl: { type: String, minLength: 5, required: true },
  likes: { type: String, required: true },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    returnedObject.votes = returnedObject.likes;
    delete returnedObject.likes;
    delete returnedObject.__v;
    delete returnedObject._id;
    logger.info("documet", document, "returned object", returnedObject);
    
  },
});

module.exports = mongoose.model("Blog", blogSchema);
