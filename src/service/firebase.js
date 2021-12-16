import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, get, ref, child, push, update, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBpabxsbKQl2sE_L1DCWe5eaCMk8XDlgqs',
    authDomain: 'notionitis.firebaseapp.com',
    projectId: 'notionitis',
    storageBucket: 'notionitis.appspot.com',
    messagingSenderId: '611834882905',
    appId: '1:611834882905:web:0b786850af54682512ba48',
    measurementId: '${config.measurementId}',
    databaseURL: 'https://notionitis-default-rtdb.firebaseio.com/',
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// const database = firebase.database();
const database = getDatabase(app);
const dbRef = ref(getDatabase());

const queryGetUsers = get(child(dbRef, `users`));
const newUserKey = push(child(dbRef, 'users')).key;

const saveNewUser = (data) => {
    const { id, name, email } = data;
    set(ref(database, 'users/' + id), {
        name: name,
        email: email,
    })
        .then(() => {
            // cool
        })
        .catch((e) => {
            // e
            console.log(e);
        });
};

export { auth, database, provider, queryGetUsers, newUserKey, saveNewUser };
