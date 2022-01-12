import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBvT4xD2MZaGOMFb8bdbdsPS-fPNHVawAY",
  authDomain: "crwn-clothing-db-57448.firebaseapp.com",
  projectId: "crwn-clothing-db-57448",
  storageBucket: "crwn-clothing-db-57448.appspot.com",
  messagingSenderId: "461893206043",
  appId: "1:461893206043:web:61cd9f04258cd01e61f8be",
  measurementId: "G-HN6P08M6FV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;