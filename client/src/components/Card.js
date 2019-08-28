import React, { Component } from "react";
import caketang from "../caketang.json";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caketang
    };
  }

  render() {
    return (
      <div className="card">
        <h1 className="ornament-top">K</h1>
        <span className="number-top">{this.props.vote}</span>
        <img className="logo-top" alt="logo decoration" src="/logodoang.png" />
        <div className="photo">
          <img
            alt="foto caketang"
            src={this.state.caketang[this.props.vote - 1].photo}
          />
        </div>
        <div className="name">
          <span>{this.state.caketang[this.props.vote - 1].nama}</span>
        </div>
        <img
          alt="logo decoration"
          className="logo-bottom"
          src="/logodoang.png"
        />
        <span className="number-bottom">{this.props.vote}</span>
        <h1 className="ornament-bottom">K</h1>
      </div>
    );
  }
}
