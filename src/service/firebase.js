import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, get, ref, child, push, set } from 'firebase/database';

//ToDo вынести в отдельный конфиг
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

//ToDo вынести все query за класс
class FirebaseService {
    constructor() {
        this.app = firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.provider = new firebase.auth.GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' });
        this.database = getDatabase(this.app);
        this.dbRef = ref(getDatabase());
    }

    queryGetUsers() {
        return get(child(this.dbRef, `users`));
    }

    queryGetPages(userId) {
        return get(child(this.dbRef, `pages/${userId}`));
    }

    queryGetPage(userId, pageId) {
        return get(child(this.dbRef, `pages/${userId}/${pageId}`));
    }

    queryGetBlocks(userId, pageId) {
        return get(child(this.dbRef, `notes/${userId}/${pageId}`));
    }

    queryGetUserById(userId) {
        return get(child(this.dbRef, `users/${userId}`));
    }

    async signInWithGoogle() {
        //ToDo исправить
        let signInUser;

        return this.auth
            .signInWithPopup(this.provider)
            .then((result) => {
                signInUser = result.user;
                return this.findUserByEmail(result.user.email);
            })
            .then((user) =>
                user
                    ? user
                    : this.saveNewUser({
                          name: signInUser.displayName,
                          email: signInUser.email,
                      })
            )
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    findUserByEmail(email) {
        return this.getUsers()
            .then((users) => {
                return users[Object.keys(users).find((key) => users[key].email === email)];
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    findUserById(userId) {
        return this.queryGetUserById(userId).then((snapshot) => {
            return snapshot.val();
        });
    }

    isUrlExists(userId, url) {
        return this.queryGetPages(userId)
            .then((snapshot) => {
                const pages = snapshot.val();
                return Object.keys(pages).find((key) => pages[key].url === url);
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    getUsers() {
        return this.queryGetUsers()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val();
                } else {
                    throw new Error('No data available');
                }
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    getPages(userId) {
        return this.queryGetPages(userId)
            .then((snapshot) => snapshot.val())
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    getPage(userId, pageId) {
        return this.queryGetPage(userId, pageId)
            .then((snapshot) => snapshot.val())
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    updateNoteBlocks(userId, noteId, noteData) {
        return set(child(this.dbRef, `notes/${userId}/${noteId}`), noteData);
    }

    getNoteBlocks(userId, pageId) {
        return this.queryGetBlocks(userId, pageId)
            .then((snapshot) => snapshot.val())
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    appendNewPage(userId, pageData) {
        return push(child(this.dbRef, `pages/${userId}`), pageData);
    }

    updatePage(userId, pageId, pageData) {
        set(child(this.dbRef, `pages/${userId}/${pageId}`), pageData);
    }

    saveNewUser(user) {
        return push(ref(this.database, 'users'), user)
            .then((res) => ({
                ...user,
                id: user.key,
            }))
            .catch((error) => {
                throw new Error(error.message);
            });
    }
}

export default new FirebaseService();

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
