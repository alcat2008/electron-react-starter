// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../styles/views/Home.less';

import ipc from '../service/ipc';

export default class Home extends Component {
  _print = () => {
    ipc.send('print', 'Foxit Reader PDF Printer');
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <button onClick={this._print}>print</button>
        </div>
      </div>
    );
  }
}
