import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBpabxsbKQl2sE_L1DCWe5eaCMk8XDlgqs',
    authDomain: 'notionitis.firebaseapp.com',
    projectId: 'notionitis',
    storageBucket: 'notionitis.appspot.com',
    messagingSenderId: '611834882905',
    appId: '1:611834882905:web:0b786850af54682512ba48',
    measurementId: '${config.measurementId}',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
// export { signInWithGoogle }
