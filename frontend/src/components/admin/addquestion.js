import React, { Component } from "react";
import request from "../../utils/request";
class addquestion extends Component {
  state = {
    question: {
      questionText: "",
      answers: [
        {
          answerText: "",
          answerScore: 0
        },
        {
          answerText: "",
          answerScore: 0
        },
        {
          answerText: "",
          answerScore: 0
        },
        {
          answerText: "",
          answerScore: 0
        }
      ]
    }
  };

  handleChange = (e, idx) => {
    const { name, value } = e.target;
    const question = { ...this.state.question };
    if (name === "questionText") {
      question.questionText = value;
    }
    if (name === "answerText") {
      question.answers[idx].answerText = value;
    }
    if (name === "answerScore") {
      question.answers[idx].answerScore = value;
    }
    this.setState({ question });
  };

  submitQuestion = e => {
    const { question } = this.state;
    const url = "/question/addNew";
    request("post", url, { ...question })
      .then(r => {
        console.log("result", r);
      })
      .catch(e => {
        console.log("Error", e);
      });
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-9" style={{ margin: "0 auto" }}>
          <div className="form-group-admin">
            <label htmlFor="exampleFormControlInput1">Question</label>
            <textarea
              type="text"
              name="questionText"
              onChange={this.handleChange}
              className="form-control"
              placeholder="write question here"
            />
          </div>
          {/* <button className="btn btn-primary">Add Answers</button> */}
          <div className="form-group-admin answer-container">
            <label htmlFor="exampleFormControlTextarea1">Answer</label>
            {[1, 2, 3, 4].map((item, idx) => {
              return (
                <div key={item} className="answer-details">
                  <textarea
                    className="form-control question-field"
                    name="answerText"
                    rows={3}
                    onChange={e => this.handleChange(e, idx)}
                  />
                  <textarea
                    rows={3}
                    name="answerScore"
                    className="form-group  score-field"
                    onChange={e => this.handleChange(e, idx)}
                  />
                </div>
              );
            })}
            <button className="btn btn-primary" onClick={this.submitQuestion}>
              submit question
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default addquestion;
