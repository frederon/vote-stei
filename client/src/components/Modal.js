import React, { Component } from "react";
import "./Modal.css";

export default class Modal extends Component {
  render() {
    const showHideClassName = this.props.modal
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}
          <button onClick={this.props.handleClose}>Close</button>
          {this.props.status === "success" && 
            <button className="continue" onClick={this.props.handleSuccess}>Continue</button>
          }
        </section>
      </div>
    );
  }
}
