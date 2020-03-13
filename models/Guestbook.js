const mongoose = require("mongoose");

const guestbookSchema = mongoose.Schema({
  messages: [
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        ref: "Users"
      },
      messageText: {
        type: String,
        required: true
      }
    }
  ]
});
const Guestbook = mongoose.model("Guestbook", guestbookSchema);

module.exports = Guestbook;
