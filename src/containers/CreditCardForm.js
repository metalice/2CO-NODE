import React, { Component } from "react";
import Aux from "../hoc/Aux";
import CardReactFormContainer from "card-react";
import "./CreditCardForm.css";

export default class CreditCardForm extends Component {
  state = {
    error: {
      message: null
    }
  };

  submitPaymentHandler = event => {
    event.preventDefault();
    const extractedValues = [];
    for (let i = 0; i < 4; i++) {
      let currentValue = event.target.elements[i].value;
      if (currentValue === null || currentValue === "") {
        this.setState({
          ...this.state,
          error: {
            message: "Please fill all fields before submitting"
          }
        });
        return;
      } else {
        extractedValues.push(currentValue);
        this.setState({
          ...this.state,
          error: {
            message: null
          }
        });
      }
    }
    extractedValues.pop();
    const [cardNumber, expiryDate, cvv] = extractedValues.map(value =>
      value.replace(/\s/gm, "")
    );
    this.props.sendCCback({ cardNumber, expiryDate, cvv });
  };

  render() {
    const showEmptyError = this.state.error.message ? (
      <p style={{ color: "red" }}>{this.state.error.message}</p>
    ) : null;

    const showTokenError = this.props.error.errorMessage ? (
      <p style={{ color: "red" }}>Something went wrong. Please try again.</p>
    ) : null;

    const form = this.props.showForm ? (
      <div className="credit-card-form">
        <div id="card-wrapper" className="card-wrapper" />
        <CardReactFormContainer
          container="card-wrapper"
          formInputsNames={{
            number: "CCnumber",
            expiry: "CCexpiry",
            cvc: "CCcvc",
            name: "CCname"
          }}
        >
          {showEmptyError || showTokenError}

          <form
            onSubmit={event => this.submitPaymentHandler(event)}
            className="form-container"
          >
            <input placeholder="Card number" type="text" name="CCnumber" />
            <input placeholder="MM/YYYY" type="text" name="CCexpiry" />
            <input placeholder="CVV" type="text" name="CCcvc" />
            <input type="submit" value="Submit Payment" />
          </form>
        </CardReactFormContainer>
      </div>
    ) : null;

    return <Aux>{form}</Aux>;
  }
}
