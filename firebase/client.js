import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDUBHTkwDqbugE2GKbs71847li_BUTlM9U",
  authDomain: "devter-3b5d1.firebaseapp.com",
  databaseURL: "https://devter-3b5d1.firebaseio.com",
  projectId: "devter-3b5d1",
  storageBucket: "devter-3b5d1.appspot.com",
  messagingSenderId: "749605338456",
  appId: "1:749605338456:web:2374b24b05d7f8b032b92d",
  measurementId: "G-FD1H67TZGJ",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const {email, photoURL, displayName} = user;
  return {
    avatar: photoURL,
    email,
    username: displayName,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
