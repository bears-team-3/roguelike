import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class LeaderBoard extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getScores());
  }
  render() {
    return <div>
        <Link to={'/'} className="link dim tracked gold absolute pointer mr3 leaderboard-button">
          Back
        </Link>
        <h1 className="tracked gold ma0 pa4">LeaderBoard</h1>
        <table className="collapse ba br2 b--black-10 pv2 ph3 w-90 center">
          <tbody>
            <tr className="striped--light-silver">
              <th className="pv2 ph3 tl f6 fw6">Username</th>
              <th className="pv2 ph3 tl f6 fw6">Level</th>
              <th className="pv2 ph3 tl f6 fw6">Depth</th>
              <th className="pv2 ph3 tl f6 fw6">Boss Killed</th>
            </tr>
            {this.props.scores.map((score, indx) => {
              return <tr className="striped--light-silver" key={score.savedAt + indx}>
                  <td className="pv2 ph3 gold">
                    {score.username}
                  </td>
                  <td className="pv2 ph3 gold">
                    {score.Level}
                  </td>
                  <td className="pv2 ph3 gold">
                    {score.Depth}
                  </td>
                  <td className="pv2 ph3 gold">
                    {`${score.bossKilled}`}
                  </td>
                </tr>;
            })}
          </tbody>
        </table>
      </div>;
  }
}
const mapStateToProp = state => {
  return {
    scores: state.scores
  };
};
export default connect(mapStateToProp, null)(LeaderBoard);
