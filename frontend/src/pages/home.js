import React, { Component } from "react";
import Navbar from "../components/navbar";
import { Redirect } from "react-router-dom";
import Axios from "axios";
class Home extends Component {
  state = {
    question: {
      answers: []
    },
    selectedAnswer: {}
  };
  componentDidMount() {
    Axios.get("http://localhost:5000/todayQuestion").then(r =>
      this.setState({ question: r.data })
    );
  }

  handleSelectAnswer = (event, selectedAnswer) => {
    this.setState({ selectedAnswer });
  };

  submitAnswer = e => {
    e.preventDefault();
    Axios.post("http://localhost:5000/submitAnswer/:questionId", {
      selectedAnswer: this.state.selectedAnswer
    })
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.log(e);
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
                      let selectedAnswer = false;
                      if (answer.id === this.state.selectedAnswer.id) {
                        selectedAnswer = true;
                      }
                      return (
                        <div
                          class="choice"
                          onClick={e => this.handleSelectAnswer(e, answer)}
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
                              background: selectedAnswer ? "green" : ""
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
