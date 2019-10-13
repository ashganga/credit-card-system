/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './table.css';
import { TABLE_HEADER } from './constants';

export default class Table extends Component {
static propTypes = {
  cardDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

renderTableHeader() {
  return TABLE_HEADER.map(key => <th>{key}</th>);
}

renderTableData() {
  const { cardDetails } = this.props;
  return cardDetails.map((cardDetail, index) => {
    const {
      name, cardNumber, limit, balance
    } = cardDetail;
    return (
      <tr key={index}>
        <td>{name}</td>
        <td>{cardNumber}</td>
        <td>{balance}</td>
        <td>{limit}</td>
      </tr>
    );
  });
}

render() {
  return (
    <div>
      <h3 id="table-title">Existing Cards</h3>
      <table id="cards">
        <tbody>
          <tr>{this.renderTableHeader()}</tr>
          {this.renderTableData()}
        </tbody>
      </table>
    </div>
  );
}
}
