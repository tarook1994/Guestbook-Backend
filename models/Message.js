const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    messageText : {
        type: String,
        required: true
    }
});



const Message = mongoose.model("Message", messageSchema);


module.exports = Message;
