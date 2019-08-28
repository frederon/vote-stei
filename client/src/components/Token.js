import React, { Component } from "react";
import Modal from "./Modal";
import "./Login.css";
import axios from "axios";

export default class Token extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nim: "",
      message: "",
      modal: false
    };

    this.onChangeNIM = this.onChangeNIM.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  showModal = e => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  onChangeNIM(e) {
    this.setState({
      nim: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.nim) {
      axios
        .post(`http://localhost:4000/mahasiswa/createtoken/${this.state.nim}`)
        .then(res => {
          if (res.data != null) {
            if (res.data.status === "success") {
              this.setState({
                status: "Success!",
                message: `Token: ${res.data.token}`
              });
            } else if (res.data.status === "failed") {
              this.setState({
                status: "Error!",
                message: res.data.message
              });
            }
          } else {
            this.setState({
              status: "Error!",
              message: "Enter nim to continue"
            });
          }
          this.setState({
            modal: true
          });
        });
    }
  }

  getToken(e) {
    e.preventDefault();

    if (this.state.nim) {
      axios
        .get(`http://localhost:4000/mahasiswa/${this.state.nim}`)
        .then(res => {
          if (res.data != null) {
            this.setState({
              status: "Success",
              message: `NIM : ${res.data.nim}
                        Token: ${res.data.token}
                        Voted: ${res.data.vote !== undefined ? true : false}`
            });
          } else {
            this.setState({
              status: "Failed",
              message: "NIM not found."
            });
          }
          this.setState({
            modal: true
          });
        });
    }
  }

  render() {
    return (
      <div id="App">
        <Modal modal={this.state.modal} handleClose={this.hideModal}>
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
            type="Submit"
            id="submit"
            value="Create Token"
            onChange={this.onSubmit}
          ></input>
          <button id="submit" onClick={this.getToken}>
            Get Token
          </button>
        </form>
      </div>
    );
  }
}
