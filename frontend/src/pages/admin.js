import React, { Component } from "react";
import AnswerDetail from "../components/AnswerDetail";
import axios from "axios";

class Admin extends Component {
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
    // console.log(idx);
    // return console.log(question.answers[idx]);
    if (name === "questionText") {
      question.questionText = value;
    }
    if (name === "answerText") {
      question.answers[idx].answerText = value;
    }
    if (name === "answerScore") {
      question.answers[idx].answerScore = value;
    }
    console.log(question);
    this.setState({ question });
  };

  submitQuestion = e => {
    const { question } = this.state;
    const url = "localhost:5000/question/addNew";
    axios
      .post(url, { question })
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  render() {
    return (
      <div>
        <div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Question</label>
            <textarea
              type="text"
              name="questionText"
              onChange={this.handleChange}
              className="form-control"
              placeholder="write question here"
            />
          </div>
          <button className="btn btn-primary">Add Answers</button>
          <div className="form-group answer-container">
            <label htmlFor="exampleFormControlTextarea1">Answer</label>
            {[1, 2, 3, 4].map((item, idx) => {
              return (
                <div className="answer-details">
                  <textarea
                    className="form-control"
                    name="answerText"
                    rows={3}
                    onChange={e => this.handleChange(e, idx)}
                  />
                  <textarea
                    rows={3}
                    name="answerScore"
                    className="form-group"
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
        {/* <div className="container preview">
          <div>question</div>
          <textarea
            type="text"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.question}
          />
        </div> */}
        {/* <div>
          {this.state.answers.map(answer => {
            return <h4>{answer.text}</h4>;
          })}
        </div> */}
      </div>
    );
  }
}

export default Admin;
