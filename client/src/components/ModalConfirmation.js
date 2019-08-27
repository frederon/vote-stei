import React, { Component } from "react";
import "./Modal.css";

export default class ModalConfirmation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showHideClassName = this.props.modal
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main confirmation">
          <h1>Notice</h1>
          <span>Apakah Anda yakin?</span>
          <div className="modal-buttons">
            <button onClick={this.props.handleClose}>Tidak</button>
            <button onClick={this.props.handleVote}>Ya</button>
          </div>
        </section>
      </div>
    );
  }
}
