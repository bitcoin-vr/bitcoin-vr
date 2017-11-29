import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

const tablePlacement = document.getElementById('info-table');

function InfoTable(props) {

  // example format: largest = [bitcoin amount, dollar amount]
  const { largest, total, last } = props;
  const roundBTC = 3; // will round to 3 decimal places
  const roundUSD = 2; // will round to 2 decimal places

  return (
    <table>
      <tr>
        <td><div className="align-right">Total</div></td>
        <td>BTC</td>
        <td><div className="numbers">
          ${formatNumber(total[0], roundBTC)}
        </div></td>
        <td>$</td>
        <td><div className="numbers">
          ${formatNumber(total[1], roundUSD)}
        </div></td>
      </tr>
      <tr>
        <td><div className="align-right">Largest</div></td>
        <td>BTC</td><td><div className="numbers">
          ${formatNumber(largest[0], roundBTC)}
        </div></td>
        <td>$</td>
        <td><div className="numbers">
          ${formatNumber(largest[1], roundUSD)}
        </div></td>
      </tr>
      <tr>
        <td><div className="align-right">Newest</div></td>
        <td>BTC</td>
        <td><div className="numbers">
          ${formatNumber(last[0], roundBTC)}
        </div></td>
        <td>$</td>
        <td><div className="numbers">
          ${formatNumber(last[1], roundUSD)}
        </div></td>
      </tr>
    </table>
  );
}

function formatNumber(number, decimalPlaces) {
  return number.toFixed(decimalPlaces).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const mapState = state => {
  return {
    largest: state.blockchainTransactions.largest,
    total: state.blockchainTransactions.total,
    last: state.blockchainTransactions.last
  };
};

const wrapper = connect(mapState)(InfoTable);

ReactDOM.render(
  wrapper,
  tablePlacement
);
