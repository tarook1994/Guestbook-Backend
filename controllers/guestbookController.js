const Guestbook = require("../models/Guestbook");

module.exports.addMessage = async (req, res, next) => {
  const { user } = req;
  const { messageText } = req.body;
  const message = {
    name: user.name,
    email: user.email,
    messageText: messageText
  };
  try {
    await Guestbook.findOneAndUpdate(
      { _id: "5e6bf1ec8179613700c8b836" },
      {
        $push: { messages: message }
      },
      { new: true, safe: true, upsert: true }
    );

    return res.status(201).json({ code: 201, message: "Created" });
  } catch (error) {
    return res.status(500).json({ code: 500, message: "Cannot Add Message." });
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const document = await Guestbook.find();
    if (document[0]) {
      return res.status(200).json({ messages: document[0].messages });
    }
  } catch (error) {
    return res.status(500).json({ code: 500, error: error.message });
  }
};
