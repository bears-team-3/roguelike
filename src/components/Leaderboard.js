import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getScores());
  }
  render() {
    return <div>
        <h1 className="tracked gold ma0 pa4">LeaderBoard</h1>
        {this.props.scores.map(score => {
          return <div className="dt dt--fixed" key={score.savedAt}>
              <div className="dtc tc pv2 bg-black-90 ">
                <span className='gold'>{score.username}</span>
              </div>
              <div className="dtc tc pv2 bg-black-90 ">
                <span className='gold'>{score.score}</span>
              </div>
            </div>;
        })}
      </div>;
  }
}
const mapStateToProp = state => {
  return {
    scores: state.scores
  };
};
export default connect(mapStateToProp, null)(LeaderBoard);
