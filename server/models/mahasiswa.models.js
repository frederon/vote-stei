const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Mahasiswa = new Schema({
  nim: {
    type: String
  },
  token: {
    type: String
  },
  vote: {
    id: {
      type: String
    },
    date: { type: Date }
  }
});

module.exports = mongoose.model("Mahasiswa", Mahasiswa);
