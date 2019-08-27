import React, { Component } from "react";
import caketang from '../caketang.json';
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caketang
    };

    console.log(this.state.caketang[0].photo);
  }

  render() {
    return (
      <div className="card">
        <h1 className="ornament-top">K</h1>
        <span className="number-top">{this.props.vote}</span>
        <img className="logo-top" src="/logodoang.png"></img>
        <div className="photo">
          <img src={this.state.caketang[this.props.vote-1].photo}></img>
        </div>
        <div className="name">
          <span>{this.state.caketang[this.props.vote-1].nama}</span>
        </div>
        <img className="logo-bottom" src="/logodoang.png"></img>
        <span className="number-bottom">{this.props.vote}</span>
        <h1 className="ornament-bottom">K</h1>
      </div>
    );
  }
}
