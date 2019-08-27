import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import Modal from "./Modal";
import { Redirect } from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nim: "",
      token: "",
      modal: false,
      status: "Error!",
      statusClass: "error",
      redirect: false,
      message: "Please enter your token and NIM to continue"
    };

    this.onChangeNIM = this.onChangeNIM.bind(this);
    this.onChangeToken = this.onChangeToken.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  showModal = e => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  onRedirect = () => {
    this.setState({ redirect: true })
  }

  onChangeNIM(e) {
    this.setState({
      nim: e.target.value
    });
  }

  onChangeToken(e) {
    this.setState({
      token: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Token: ${this.state.token}`);
    console.log(`NIM: ${this.state.nim}`);

    this.setState({
      statusClass: "error",
      status: "Error!",
      message: "Please enter your token and NIM to continue"
    });

    if (this.state.nim && this.state.token) {
      axios
        .get(`http://localhost:4000/mahasiswa/${this.state.nim}`)
        .then(res => {
          if (res.data != null) {
            console.log(this.state.token);
            if (res.data.token === this.state.token) {
              this.setState({ status: "Success!", message: "Thank you!", statusClass: "success"});
            } else {
              this.setState({
                status: "Error!",
                message: "Your token is invalid"
              });
            }
          } else {
            this.setState({
              status: "Error!",
              message: "Your NIM isn't found."
            });
          }
          this.setState({
            modal: true,
          });
        });
    }

    this.setState({
      modal: true
    });
  }

  render() {

    if (this.state.redirect == true) {
      return (
        <Redirect
          to={{
            pathname: "/vote",
            state: {
              nim: this.state.nim,
              token: this.state.token
            }
          }}
        />
      );
       //return (<Vote nim={this.state.nim} token={this.state.token}></Vote>);
     }
    return (
      <div id="App">
        <Modal modal={this.state.modal} handleClose={this.hideModal} handleSuccess={this.onRedirect} status={this.state.statusClass} nim={this.state.nim} token={this.state.token}>
          <h1 className={this.state.statusClass}>{this.state.status}</h1>
          <p>{this.state.message}</p>
        </Modal>
        <div className="header">
          <img id="stei-logo-red" src="/logoh.png" alt="Logo STEI 2019"></img>
          <h1>Pemilihan Ketua Angkatan</h1>
        </div>
        <form id="login" onSubmit={this.onSubmit}>
          <input
            type="text"
            maxLength="8"
            id="nim"
            placeholder="NIM"
            name="nim"
            value={this.state.nim}
            onChange={this.onChangeNIM}
          ></input>
          <input
            type="text"
            maxLength="4"
            id="token"
            placeholder="Token"
            name="token"
            value={this.state.token}
            onChange={this.onChangeToken}
          ></input>
          <input
            type="Submit"
            id="submit"
            value="Start"
            onChange={this.onSubmit}
          ></input>
        </form>
      </div>
    );
  }
}
