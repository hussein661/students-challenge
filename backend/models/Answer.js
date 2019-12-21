const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    answer_id: {
      type: String
    },
    user_id: {
      type: String,
      required: true
    },
    question_id: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
