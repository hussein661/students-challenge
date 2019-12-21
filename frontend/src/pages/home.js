import React, { Component } from "react";
import Navbar from "../components/navbar";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import request from "../utils/request";

class Home extends Component {
  state = {
    question: {
      answers: []
    },
    selectedAnswerId: null
  };
  componentDidMount() {
    request("get", "/todayQuestion")
      .then(r => {
        this.setState({ question: r.data });
        console.log(r.data);
        request("post", "/isQuestionAnswered", { question_id: r.data._id })
          .then(r => {
            if (r.data === false) {
              return;
            }
            this.setState({ selectedAnswerId: r.data.answer_id });
          })
          .catch(e => {
            console.log(e.response);
          });
      })
      .catch(e => {
        alert();
        console.log(e.response);
      });
  }

  handleSelectAnswer = (event, selectedAnswerId) => {
    this.setState({ selectedAnswerId });
  };

  submitAnswer = e => {
    e.preventDefault();
    request("post", "/user_answer_question", {
      question_id: this.state.question._id,
      answer_id: this.state.selectedAnswerId
    })
      .then(r => {
        console.log(r.response);
        // alert("answered updated");
        // window.location.reload();
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  render() {
    const { question } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row" style={{ width: "100%" }}>
            <form
              style={{ width: "100%", margin: "0 auto" }}
              onSubmit={this.submitAnswer}
            >
              <div className="test col-md-6 col-md-offset-3">
                <h1 className="title">{question.questionText}</h1>
                <div className="module">Food</div>
                <div className="level">Intermediate</div>
                <div className="question">
                  <h2 className="title">Which of these is not a fruit?</h2>
                  <div className="choices">
                    {question.answers.map(answer => {
                      let isAnswerSelected = false;
                      if (answer.id === this.state.selectedAnswerId) {
                        isAnswerSelected = true;
                      }
                      return (
                        <div
                          class="choice"
                          onClick={e => this.handleSelectAnswer(e, answer.id)}
                        >
                          <input
                            type="radio"
                            value={answer.id}
                            name={answer.answerText}
                            id={answer.id}
                          />
                          <label
                            for={answer.answerText}
                            style={{
                              background: isAnswerSelected ? "green" : ""
                            }}
                          >
                            <span class="glyphicon glyphicon-ok"></span>
                            {answer.answerText}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div id="feedback">
                  <div className="header">
                    <a
                      className="collapsed"
                      data-toggle="collapse"
                      data-target="#feedback .body"
                    >
                      <span className="when-closed">
                        Click here to leave feedback about this question
                      </span>
                      <span className="when-open">Close</span>
                      <span className="glyphicon glyphicon-chevron-down when-closed" />
                      <span className="glyphicon glyphicon-chevron-up when-open" />
                    </a>
                  </div>
                  <div className="body collapse">
                    <div className="thumbs">
                      <input
                        type="radio"
                        defaultValue="up"
                        name="thumb"
                        id="thumbs-up"
                      />
                      <label htmlFor="thumbs-up">
                        <span className="glyphicon glyphicon-thumbs-up" />
                      </label>
                      <input
                        type="radio"
                        defaultValue="down"
                        name="thumb"
                        id="thumbs-down"
                      />
                      <label htmlFor="thumbs-down">
                        <span className="glyphicon glyphicon-thumbs-down" />
                      </label>
                    </div>
                    <textarea
                      className="form-control comments"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <button className="btn btn-primary pull-right">
                  Submit Answer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
