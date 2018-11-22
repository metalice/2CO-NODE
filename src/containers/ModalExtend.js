import React, { Component } from "react";
import Modal from "react-responsive-modal";
import Aux from "../hoc/Aux";

export default class ModalExtend extends Component {
  state = {
    open: this.props.open
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Aux>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          {this.props.children}
        </Modal>
      </Aux>
    );
  }
}
