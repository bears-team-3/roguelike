import React, { Component } from 'react';
import firebase, { firebaseRef } from '../firebase';
import GameContainer from '../components/GameContainer';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Leaderboard from '../components/Leaderboard';
// import PublicRoute from '../components/PublicRoute';
// import PrivateRoute from '../components/PrivateRoute';

class Root extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebaseRef
          .ref(`users/${user.uid}/username`)
          .once('value')
          .then(snapshot => {
            dispatch(actions.login(user.uid, snapshot.val(), user.photoURL));
            dispatch(actions.loaded());
          }, err => err);
      } else {
        dispatch(actions.logout());
        dispatch(actions.loaded());
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const { auth } = this.props;
    return auth.loading
      ? <h1>Loading</h1>
      : <BrowserRouter>
          <div className="w-100 bg-black-90 min-vh-100">
            <Switch>
              <Route path="/" exact component={GameContainer} />
              <Route path="/leaderboard" exact component={Leaderboard} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </BrowserRouter>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(Root);
