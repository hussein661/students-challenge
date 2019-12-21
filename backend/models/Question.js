const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true
    },
    answers: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
