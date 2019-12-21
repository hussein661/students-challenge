const express = require("express");
const Question = require("../models/question");
const Answer = require("../models/Answer");

const auth = require("../middleware/auth");
const uuid = require("uuid");
const router = new express.Router();

router.post("/question/addNew", async (req, res) => {
  const questionToAdd = { ...req.body };
  questionToAdd.answers.map(q => {
    q.id = uuid();
  });
  const question = new Question({
    ...questionToAdd
  });

  try {
    await question.save();
    res.status(201).send(question);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /question?completed=true
// GET /question?limit=10&skip=20
// GET /question?sortBy=createdAt:desc
router.get("/question", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "question",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.question);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/todayQuestion", auth, async (req, res) => {
  try {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    const question = await Question.findOne({
      createdAt: { $gte: start, $lt: end }
    });
    res.send(question);
  } catch (e) {
    return e;
  }
});

router.post("/user_answer_question", auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { question_id, answer_id } = { ...req.body };
    const answeredQuestion = await Answer.findOne({
      question_id,
      user_id
    });
    if (answeredQuestion) {
      return res.status(400).json({ error: "question already answered" });
    }
    const answer = new Answer({
      user_id,
      question_id,
      answer_id
    });
    answer.save();
    return res.send(answer);
  } catch (e) {
    return res.status({ e });
  }
});

router.post("/isQuestionAnswered", auth, async (req, res) => {
  try {
    const user_id = req.user._id;
    const { question_id } = req.body;
    console.log(user_id, question_id);
    const answeredQuestion = await Answer.findOne({
      question_id,
      user_id
    });
    if (answeredQuestion) {
      return res.send(answeredQuestion);
    }
    return res.send(false);
  } catch (e) {
    return res.status({ e });
  }
});

router.get("/question/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const question = await Question.findOne({ _id, owner: req.user._id });

    if (!question) {
      return res.status(404).send();
    }

    res.send(question);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/question/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const question = await question.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!question) {
      return res.status(404).send();
    }

    updates.forEach(update => (question[update] = req.body[update]));
    await question.save();
    res.send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/question/:id", auth, async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!question) {
      res.status(404).send();
    }

    res.send(question);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
