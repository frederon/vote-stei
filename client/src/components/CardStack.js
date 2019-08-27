import React, { Component } from "react";
import { Redirect } from "react-router";
import "./CardStack.css";

export default class CardStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.isStackActive) {
      return (
        <div id="card-stack" className="smaller">
          <div id="stack-left" onClick={this.props.onStackClick}>
            <img src="/cardstacked1.png"></img>
          </div>
          <div id="stack-right" onClick={this.props.onStackClick}>
            <img src="/cardstacked2.png"></img>
          </div>
        </div>
      );
    }
    return (
      <div id="card-stack">
        <div id="stack-left" onClick={this.props.onStackClick}>
          <img src="/cardstacked1.png"></img>
        </div>
        <div id="stack-right" onClick={this.props.onStackClick}>
          <img src="/cardstacked2.png"></img>
        </div>
      </div>
    );
  }
}
