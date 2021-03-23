const mongoose = require("mongoose");

const { Schema } = mongoose;

const characterSchema = new Schema({
  id: Number,
  first_name: String,
  last_name: String,
  fullname: String,
  family: {
    spouse: String,
    children: String,
    parentes: String,
    siblings: String,
    relatives: String,
  },
  born: Number,
  abilities: [String],
  titles: [String],
  aliases: [String],
  groups: [String],
  residence: String,
  nationality: String,
  status: String,
  world: String,
  universe: String,
});

module.exports = mongoose.model("character", characterSchema);
