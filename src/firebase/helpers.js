import firebase from './index';

export function writeUserData(userId, name, email, imageUrl) {
  return firebase
    .database()
    .ref('users/' + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl,
      scores: null
    })
    .then(
      res => {
        console.log('new user is saved');
      },
      err => console.log('unable to save new user')
    );
}

export function checkIfUserExists(userId) {
  return firebase.database().ref('users/').child(userId).once('value').then(
    res => {
      if (res.val() !== null) {
        return true;
      }
      return false;
    },
    err => {
      console.log('unable to check if user exists');
    }
  );
}
