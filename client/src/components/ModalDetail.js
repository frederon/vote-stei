import React, { Component } from "react";
import Card from "./Card";
import ModalConfirmation from "./ModalConfirmation";
import caketang from "../caketang.json";
import "./Modal.css";

export default class ModalDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmation: false,
      caketang
    };
  }

  showConfirmation = e => {
    this.setState({ confirmation: true });
  };

  hideConfirmation = () => {
    this.setState({ confirmation: false });
  };

  render() {
    const showHideClassName = this.props.modal
      ? "modal display-block"
      : "modal display-none";

    let prestasi = this.state.caketang[this.props.vote - 1].prestasi.map((p,i) => (
      <li>{i+1}. {p}</li>
    ));

    return (
      <div className={showHideClassName}>
        <ModalConfirmation
          modal={this.state.confirmation}
          handleClose={this.hideConfirmation}
          handleVote={this.props.handleVote}
          vote={this.props.vote}
          nim={this.props.nim}
          token={this.props.token}
        ></ModalConfirmation>
        <section className="modal-main details">
          <div className="modal-details">
            <Card vote={this.props.vote}></Card>
            <div className="modal-data-details">
              <span>
                <b>Nama</b>: {this.state.caketang[this.props.vote - 1].nama}
              </span>
              <br></br>
              <span>
                <b>TTL</b>: {this.state.caketang[this.props.vote - 1].ttl}
              </span>
              <br></br>
              <span>
                <b>Visi</b>: {this.state.caketang[this.props.vote - 1].visi}
              </span>
              <br></br>
              <span>
                <b>Misi</b>: {this.state.caketang[this.props.vote - 1].misi}
              </span>
              <br></br>
              <span>
                <b>Prestasi</b>: <ol>{prestasi}</ol>
              </span>
              <br></br>
            </div>
            <button className="vote" onClick={this.showConfirmation}>
              VOTE
            </button>
          </div>
          <button onClick={this.props.handleClose}>Close</button>
        </section>
      </div>
    );
  }
}
