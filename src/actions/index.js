import firebase, { firebaseRef, githubProvider } from '../firebase';
import { writeUserData, checkIfUserExists } from '../firebase/helpers';
const moment = require('moment');

export const login = (uid, username, photoURL) => {
  return {
    type: 'LOGIN',
    uid,
    username,
    photoURL
  };
};

export const loaded = () => {
  return {
    type: 'LOADED'
  };
};

export const loading = () => {
  return {
    type: 'LOADING'
  };
};

export const saveScoreForLoggedUser = (uid, score, username) => {
  return dispatch => {
    const scoreData = {
      score,
      username,
      savedAt: moment().unix()
    };

    const newScoreKey = firebaseRef.ref().child('scores').push().key;

    const updates = {};
    updates[`/scores/${newScoreKey}`] = scoreData;
    updates[`/users/${uid}/scores/${newScoreKey}`] = scoreData;

    return firebaseRef.ref().update(updates).then(
      result => {
        console.log('your score is saved');
        dispatch(setScore(0));
      },
      error => {
        console.log('unable to save score', error);
      }
    );
  };
};

export const startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then(
      async result => {
        console.log('auth worked', result);

        const exists = await checkIfUserExists(result.user.uid);

        if (!exists) {
          await writeUserData(
            result.user.uid,
            result.additionalUserInfo.username,
            result.user.email,
            result.user.photoURL
          );
        }
      },
      error => {
        console.log('unable to auth', error);
      }
    );
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('loged out');
    });
  };
};

export const setScore = score => {
  return {
    type: 'SET_SCORE',
    score
  };
};

const addScores = scores => {
  return {
    type: 'ADD_SCORES',
    scores
  };
};

export const getScores = () => {
  return async dispatch => {
    const scores = await firebaseRef.ref('/scores').once('value');
    const scoresObj = scores.val();
    const parsedScores = Object.keys(scoresObj)
      .map(scoreId => {
        return { ...scoresObj[scoreId] };
      })
      .sort((a, b) => a.score < b.score);

    return dispatch(addScores(parsedScores));
  };
};

export const setNameForGuest = name => {
  return {
    type: 'SET_NAME',
    name
  };
};

export const saveScoreForGuest = (username, score) => {
  return async dispatch => {
    const scoreData = { 
      score,
      username,
      savedAt: moment().unix() };
    
    const savedScore =  await firebaseRef.ref('/scores').push(scoreData);
    dispatch(setScore(0));
    dispatch(setNameForGuest(null))
  };
};
