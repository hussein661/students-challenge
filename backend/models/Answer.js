const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    Answer: {
      type: String,
      required: true,
      trim: true
    },
    score: {
      type: Boolean,
      default: false
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question"
    }
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
