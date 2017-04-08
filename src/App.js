// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './styles/global/index.less';

class App extends React.Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="app-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children, { goBack: () => this.props.actions.goBack() })}
        </ReactCSSTransitionGroup>
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
