import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Aux from "../hoc/Aux";
import Script from "react-load-script";
import ModalExtend from "./ModalExtend";
import CreditCardForm from "./CreditCardForm";

class TCO extends Component {
  state = {
    sellerId: this.props.sellerId,
    publishableKey: this.props.publishableKey,
    generateTokenFor: this.props.sandbox ? "sandbox" : "production",
    showModal: this.props.showModal,
    showForm: this.props.showForm,
    showLoading: this.props.showLoading,
    scriptLoaded: false,
    scriptLoadingError: false,
    creatingTokenError: {
      errorCode: null,
      errorMessage: null
    }
  };

  errorScriptLoadedHandler = () => {
    this.setState({
      ...this.state,
      scriptLoadingError: true,
      ...this.creatingTokenError
    });
  };

  scriptLoadedHandler = () => {
    this.setState({
      ...this.state,
      scriptLoaded: true,
      ...this.creatingTokenError
    });
  };

  creatingTokenHandler = (cardNumber, expiryDate, cvv) => {
    const args = {
      sellerId: this.state.sellerId,
      publishableKey:
        this.state.publishableKeySandbox || this.state.publishableKey,
      ccNo: cardNumber,
      cvv: cvv,
      expMonth: expiryDate[0],
      expYear: expiryDate[1]
    };

    this.setState({
      ...this.state,
      scriptLoaded: false,
      showForm: false,
      ...this.creatingTokenError
    });
    window.TCO.loadPubKey(this.state.generateTokenFor, () => {
      window.TCO.requestToken(this.successReturn, this.failedReturn, args);
    });
  };

  successReturn = data => {
    this.props.returnToken(data.response.token.token);
    this.setState({
      ...this.state,
      scriptLoaded: true,
      creatingTokenError: {
        errorCode: null,
        errorMessage: null
      }
    });
  };

  failedReturn = data => {
    this.setState({
      ...this.state,
      showForm: true,
      scriptLoaded: true,
      creatingTokenError: {
        errorCode: data.errorCode,
        errorMessage: data.errorMsg
      }
    });
  };

  creditCardDetails = ({ cardNumber, expiryDate, cvv }) => {
    this.creatingTokenHandler(cardNumber, expiryDate.split("/"), cvv);
  };

  render() {
    const loader = !this.state.scriptLoaded ? (
      <Loader type="Bars" color="#00BFFF" height="100" width="100" />
    ) : null;

    const show = () => {
      if (this.state.showModal) {
        return (
          <ModalExtend open={this.state.showModal}>
            {this.state.showLoading ? loader : null}
            {this.state.showForm ? (
              <CreditCardForm
                error={this.state.creatingTokenError}
                showForm={this.state.showForm}
                sendCCback={data => this.creditCardDetails(data)}
              />
            ) : null}
          </ModalExtend>
        );
      } else {
        return (
          <Aux>
            {this.state.showLoading ? loader : null}
            {this.state.showForm ? (
              <CreditCardForm
                error={this.state.creatingTokenError}
                showForm={this.state.showForm}
                sendCCback={data => this.creditCardDetails(data)}
              />
            ) : null}
          </Aux>
        );
      }
    };

    return (
      <Aux>
        <Script
          url="https://www.2checkout.com/checkout/api/2co.min.js"
          onCreate={this.loader}
          onError={this.errorScriptLoadedHandler}
          onLoad={this.scriptLoadedHandler}
        />

        {show()}
      </Aux>
    );
  }
}

export default TCO;
