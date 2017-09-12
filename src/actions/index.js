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

export const saveScoreForLoggedUser = (uid, score, name) => {
  return dispatch => {
    const scoreData = {
      ...score,
      username: name,
      savedAt: moment().unix()
    };

    const newScoreKey = firebaseRef.ref().child('scores').push().key;

    const updates = {};
    updates[`/scores/${newScoreKey}`] = scoreData;

    //clean username from scoreData object
    const { username, ...clean } = scoreData;

    updates[`/users/${uid}/scores/${newScoreKey}`] = { ...clean };

    return firebaseRef.ref().update(updates).then(
      result => {
        console.log('your score is saved');
        dispatch(setScore(null));
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
    const scores = await firebaseRef.ref('scores').once('value');
    const scoresObj = scores.val();
    const parsedScores = Object.keys(scoresObj).map(scoreId => {
      return { ...scoresObj[scoreId] };
    });

    // parsedScores.sort((a, b) => b.score - a.score);

    return dispatch(addScores(parsedScores));
  };
};

export const setNameForGuest = name => {
  return {
    type: 'SET_NAME',
    name
  };
};

const gameSaved = saved => {
  return {
    type: 'GAME_SAVED',
    saved
  };
};

export const saveScoreForGuest = (username, score) => {
  return async dispatch => {
    const scoreData = {
      ...score,
      username,
      savedAt: moment().unix()
    };
    try {
      await firebaseRef.ref('/scores').push(scoreData);
      dispatch(gameSaved(true));
      dispatch(setScore(null));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const gameOver = () => ({
  type: 'GAME_OVER'
});
