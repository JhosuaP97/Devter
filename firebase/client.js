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

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { email, photoURL, displayName, uid } = user;
  return {
    avatar: photoURL,
    email,
    username: displayName,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return { ...data, id, createdAt: +createdAt.toDate() };
      });
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
