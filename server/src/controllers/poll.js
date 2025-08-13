const Poll = require("../models/pollModel");

exports.createPoll = async (pollData) => {
  try {
    let newPoll = new Poll(pollData);
    await newPoll.save();
    return newPoll;
  } catch (error) {
    console.error("Error creating poll:", error);
    throw error;
  }
};

exports.voteOnOption = async (pollId, optionText) => {
  try {
    const poll = await Poll.findOneAndUpdate(
      { _id: pollId, "options.text": optionText },
      { $inc: { "options.$.votes": 1 } },
      { new: true }
    );

    console.log("Vote registered successfully:", poll);
  } catch (error) {
    console.error("Error registering vote:", error);
  }
};

exports.getPolls = async (req, res) => {
  try {
    let { teacherUsername } = req.params;
    let data = await Poll.find({ teacherUsername });
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({
      error: "Failed to fetch polls"
    });
  }
};
