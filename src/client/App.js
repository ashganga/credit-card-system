import React, { Component } from 'react';
import './app.css';
import classNames from 'classnames';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './table';
import { VALIDATION_MESSAGE_CARD, VALIDATION_MESSAGE_NAME, VALIDATION_MESSAGE_LIMIT } from './constants';

export default class App extends Component {
  formDefaults = {
    name: { value: '', isValid: true, message: '' },
    cardNumber: { value: '', isValid: true, message: '' },
    limit: { value: '', isValid: true, message: '' }
  }

  state = {
    ...this.formDefaults,
    cardDetails: [],
    showError: false,
  };

  componentDidMount() {
    fetch('/api/getAll')
      .then(res => res.json())
      .then(cardDetails => this.setState({ cardDetails }));
  }

  onChange = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value,
        message: '',
        isValid: true
      }
    };
    this.setState(state);
  }

  onSubmit = (e) => {
    const { name, cardNumber, limit } = this.state;
    e.preventDefault();
    // run the validation, and if it's good move on and call an add API.
    if (this.formIsValid()) {
      fetch('/api/add', {
        method: 'POST',
        body: JSON.stringify({
          name: name.value,
          cardNumber: cardNumber.value,
          limit: limit.value,
          balance: '0',
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        } throw new Error(response.status);
      }).then((json) => {
        this.setState({
          cardDetails: json,
          showError: false,
        });
      }).catch((error) => {
        console.log('error: ', error);
        this.setState({ showError: true });
      });
    }
  }

  formIsValid = () => {
    const { name, cardNumber, limit } = this.state;
    let isGood = true;

    if (!validator.isNumeric(cardNumber.value) || cardNumber.value.length > 19) {
      cardNumber.isValid = false;
      cardNumber.message = VALIDATION_MESSAGE_CARD;
      isGood = false;
    }
    if (validator.isEmpty(name.value)) {
      name.isValid = false;
      name.message = VALIDATION_MESSAGE_NAME;
      isGood = false;
    }
    if (!validator.isNumeric(limit.value)) {
      limit.isValid = false;
      limit.message = VALIDATION_MESSAGE_LIMIT;
      isGood = false;
    }

    if (!isGood) {
      this.setState({
        name,
        cardNumber,
        limit,
      });
    }

    return isGood;
  }

  render() {
    const {
      name, cardNumber, limit, showError
    } = this.state;
    /*
    Each of the form controls below will include the 'form-control' class,
    and will only include the 'is-invalid' class if the isValid value is false.
    */
    const nameClass = classNames('form-control',
      { 'is-invalid': !name.isValid });
    const cardNumberClass = classNames('form-control',
      { 'is-invalid': !cardNumber.isValid });
    const limitClass = classNames('form-control',
      { 'is-invalid': !limit.isValid });

    return (
      <div className="container">
        <form id="credit-card" onSubmit={this.onSubmit}>
          <h1 id="heading">Credit Card System</h1>
          <h2 id="sub-heading">Add</h2>
          {showError && (
            <div className="error">
              {VALIDATION_MESSAGE_CARD}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="validationDefault01">Name</label>
            <input
              id="validationDefault01"
              type="text"
              name="name"
              className={nameClass}
              value={name.value}
              onChange={this.onChange}
            />
            <span className="invalid-feedback">{name.message}</span>
          </div>

          <div className="form-group">
            <label htmlFor="validationDefault02">Card Number</label>
            <input
              id="validationDefault02"
              type="text"
              name="cardNumber"
              className={cardNumberClass}
              value={cardNumber.value}
              onChange={this.onChange}
            />
            <span className="invalid-feedback">{cardNumber.message}</span>
          </div>

          <div className="form-group">
            <label htmlFor="validationDefault03">Limit</label>
            <input
              id="validationDefault03"
              type="text"
              name="limit"
              className={limitClass}
              value={limit.value}
              onChange={this.onChange}
            />
            <span className="invalid-feedback">{limit.message}</span>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
          >
            Add
          </button>
        </form>
        <Table
          // eslint-disable-next-line react/destructuring-assignment
          cardDetails={this.state.cardDetails}
        />
      </div>
    );
  }
}
