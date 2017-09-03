import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getScores());
  }
  render() {
    return (
      <div>
        <h1>LeaderBoard</h1>
        {this.props.scores.map(score => {
          return (
            <div className="dt dt--fixed" key={score.savedAt}>
              <div className="dtc tc pv2 bg-black-10">
                {score.username}
              </div>
              <div className="dtc tc pv2 bg-black-05">
                {score.score}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProp = state => {
  return {
    scores: state.scores
  };
};
export default connect(mapStateToProp, null)(LeaderBoard);
