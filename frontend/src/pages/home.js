import React, { Component } from "react";
import Navbar from "../components/navbar";
import { Redirect } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row" style={{ width: "100%" }}>
            <form style={{ width: "100%", margin: "0 auto" }}>
              <div className="test col-md-6 col-md-offset-3">
                <h1 className="title">This is not a test</h1>
                <div className="module">Food</div>
                <div className="level">Intermediate</div>
                <div className="question">
                  <h2 className="title">Which of these is not a fruit?</h2>
                  <div className="choices">
                    <div className="choice">
                      <input
                        type="radio"
                        defaultValue={1}
                        name="ans"
                        id="Apple"
                      />
                      <label htmlFor="Apple">
                        <span className="glyphicon glyphicon-ok" />
                        Apple
                      </label>
                    </div>
                    <div className="choice">
                      <input
                        type="radio"
                        defaultValue={2}
                        name="ans"
                        id="Banana"
                      />
                      <label htmlFor="Banana">
                        <span className="glyphicon glyphicon-ok" />
                        Banana
                      </label>
                    </div>
                    <div className="choice">
                      <input
                        type="radio"
                        defaultValue={3}
                        name="ans"
                        id="Spider"
                      />
                      <label htmlFor="Spider">
                        <span className="glyphicon glyphicon-ok" />
                        Spider
                      </label>
                    </div>
                    <div className="choice">
                      <input
                        type="radio"
                        defaultValue={4}
                        name="ans"
                        id="Strawberry"
                      />
                      <label htmlFor="Strawberry">
                        <span className="glyphicon glyphicon-ok" />
                        Strawberry
                      </label>
                    </div>
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
