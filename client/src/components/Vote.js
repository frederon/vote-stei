import React, { Component } from "react";
import { Redirect } from "react-router";
import CardStack from "./CardStack";
import Card from "./Card";
import ModalDetail from "./ModalDetail";
import axios from "axios";
import caketang from "../caketang.json";
import "./Vote.css";

export default class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caketang,
      modal: false,
      waited: false,
      isStackActive: true,
      vote: 1,
      text: "CLICK THE CARDS",
      nim:
        this.props.location.state != undefined
          ? this.props.location.state.nim
          : "",
      token:
        this.props.location.state != undefined
          ? this.props.location.state.token
          : ""
    };
  }

  onStackClick = () => {
    this.setState({
      text: "CLICK EACH CARD FOR DETAILS",
      isStackActive: !this.state.isStackActive
    });
    setTimeout(() => {
      this.setState({
        waited: true
      });
    }, 500);
  };

  showModal = (e, vote) => {
    this.setState({ modal: true, vote });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  submitVote = (nim, vote) => {
    axios.post(`http://localhost:4000/mahasiswa/${nim}/${vote}`)
      .then(res => {
        console.log(res);
        if (res.data != null) {
          console.log("success voting!");
          this.setState({
            nim: "",
            token: ""
          });
        } else {
          console.log("error voting");
        }
      })
  }

  checkToken = (nim, token) => {
    axios.get(`http://localhost:4000/mahasiswa/${nim}`)
      .then(res => {
        if (res.data != null) {
          if (res.data.token == token) {
            this.submitVote(nim, this.state.vote);
          } else {
            return false;
          }
        }
      });
  }

  handleVote = () => {
    console.log(
      `voting for nim ${this.state.nim} ${this.state.token} ${this.state.vote}`
    );
    this.checkToken(this.state.nim, this.state.token);
  }

  render() {
    if (this.props.location.state == undefined || this.state.nim == "") {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    let cards = this.state.caketang.map((card, index) => 
      (
        <a onClick={e => this.showModal(e, index+1)}>
          <Card vote={index+1}>
          </Card>
        </a>
      )
    );

    return (
      <div id="Vote">
        <ModalDetail
          modal={this.state.modal}
          handleClose={this.hideModal}
          handleVote={this.handleVote}
          vote={this.state.vote}
          nim={this.state.nim}
          token={this.state.token}
        ></ModalDetail>
        <div className="header">
          <img id="stei-logo-white" src="/logov.png" alt="Logo STEI 2019"></img>
          <h1>Daftar Calon Ketua Angkatan</h1>
        </div>
        <div className="main">
          {this.state.waited && (
            <div className="card-container">
              {cards}
            </div>
          )}
          {!this.state.waited && (
            <CardStack
              isStackActive={this.state.isStackActive}
              onStackClick={this.onStackClick}
            ></CardStack>
          )}
          <div className="boxed bleeping">{this.state.text}</div>
        </div>
      </div>
    );
  }
}
