// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CounterActions from '../actions/counter';

import styles from '../styles/views/Counter.less';

export class Counter extends React.Component {
  render() {
    const { actions, counter } = this.props;
    const { increment, incrementIfOdd, incrementAsync, decrement } = actions;
    return (
      <div>
        <a className={styles.backButton} onClick={this.props.goBack}>返回</a>
        <div className={`counter ${styles.counter}`}>
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment}>add</button>
          <button className={styles.btn} onClick={decrement}>minus</button>
          <button className={styles.btn} onClick={incrementIfOdd}>odd</button>
          <button className={styles.btn} onClick={() => incrementAsync()}>async</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = () => dispatch => ({
  actions: {
    ...bindActionCreators(CounterActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

