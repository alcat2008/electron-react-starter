// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';

import ipc from '../service/ipc';

import '../styles/global/index.less';

class App extends React.Component {
  props: {
    children: HTMLElement
  };

  _notify = () => {
    ipc.send('ipc-message', 'notification test');
  }

  render() {
    return (
      <div>
        <button onClick={this._notify}>show notification</button>
        {React.cloneElement(
          this.props.children,
          {
            goBack: () => this.props.actions.goBack()
          }
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
});

const mapDispatchToProps = () => dispatch => ({
  actions: {
    ...bindActionCreators({
      push,
      replace,
      goBack,
    }, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
