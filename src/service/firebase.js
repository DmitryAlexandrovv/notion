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
const queryGetPages = (userId) => get(child(dbRef, `pages/${userId}`));
const queryGetPage = (userId, pageId) => get(child(dbRef, `pages/${userId}/${pageId}`));
const queryGetBlocks = (userId, pageId) => get(child(dbRef, `notes/${userId}/${pageId}`));

const isUrlExists = (userId, url) => {
    return queryGetPages(userId)
        .then((snapshot) => {
            const pages = snapshot.val();
            return Object.keys(pages).find((key) => pages[key].url === url);
        })
        .catch((error) => {
            console.log(error);
        });
};

const getPages = (userId) => {
    return queryGetPages(userId)
        .then((snapshot) => snapshot.val())
        .catch((error) => {
            console.log(error);
        });
};

const getPage = (userId, pageId) => {
    return queryGetPage(userId, pageId)
        .then((snapshot) => snapshot.val())
        .catch((error) => {
            console.error(error);
        });
};

const updateNoteBlocks = (userId, noteId, noteData) => {
    return set(child(ref(getDatabase(), 'notes'), `${userId}/${noteId}`), noteData);
};

const getNoteBlocks = (userId, pageId) => {
    return queryGetBlocks(userId, pageId)
        .then((snapshot) => snapshot.val())
        .catch((error) => {
            console.error(error);
        });
};

const appendNewPage = (userId, pageData) => {
    return push(child(ref(getDatabase(), 'pages'), userId), pageData);
};

const updatePage = (userId, pageId, pageData) => {
    set(child(ref(getDatabase(), 'pages'), `${userId}/${pageId}`), pageData);
};

const saveNewUser = (data) => {
    const { id, name, email } = data;
    set(ref(database, 'users/' + id), {
        name: name,
        email: email,
    })
        .then(() => {
            //cool
        })
        .catch((e) => {
            // e
            console.log(e);
        });
};

export {
    auth,
    database,
    provider,
    queryGetUsers,
    newUserKey,
    saveNewUser,
    getPages,
    appendNewPage,
    getPage,
    updatePage,
    updateNoteBlocks,
    getNoteBlocks,
    isUrlExists,
};
