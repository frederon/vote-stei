import React, { Component } from "react";
import "./CardStack.css";

export default class CardStack extends Component {
  render() {
    if (!this.props.isStackActive) {
      return (
        <div id="card-stack" className="smaller">
          <div id="stack-left" onClick={this.props.onStackClick}>
            <img alt="card stack" src="/cardstacked1.png"></img>
          </div>
          <div id="stack-right" onClick={this.props.onStackClick}>
            <img alt="card stack" src="/cardstacked2.png"></img>
          </div>
        </div>
      );
    }
    return (
      <div id="card-stack">
        <div id="stack-left" onClick={this.props.onStackClick}>
          <img alt="card stack" src="/cardstacked1.png"></img>
        </div>
        <div id="stack-right" onClick={this.props.onStackClick}>
          <img alt="card stack" src="/cardstacked2.png"></img>
        </div>
      </div>
    );
  }
}
