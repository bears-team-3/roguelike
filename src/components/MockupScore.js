import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MockupScore extends Component {
  state = {
    score: ''
  };

  handleScore() {
    const { score } = this.state;
    const { dispatch } = this.props;

    dispatch(actions.setScore(parseInt(score, 10)));
    this.setState({ score: '' });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={e => this.setState({ score: e.target.value })}
          value={this.state.score}
        />
        <a
          className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black pointer"
          onClick={this.handleScore.bind(this)}
        >
          Mockup score
        </a>
      </div>
    );
  }
}

export default connect()(MockupScore);
