import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, get, ref, child, push, set } from 'firebase/database';

//ToDo вынести в отдельный конфиг
//Заюзать process.env
// check storageBucket, messagingSenderId, measurementId
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: 'notionitis.appspot.com',
    messagingSenderId: '611834882905',
    appId: process.env.REACT_APP_APP_ID,
    measurementId: '',
    databaseURL: process.env.REACT_APP_DATABASE_URL,
};

//ToDo вынести все query за класс
class FirebaseService {
    constructor() {
        console.log(firebaseConfig);
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

    queryGetBlocks(userId, pageId) {
        return get(child(this.dbRef, `notes/${userId}/${pageId}`));
    }

    queryAppendNewPage(userId, pageData) {
        return push(child(this.dbRef, `pages/${userId}`), pageData);
    }

    queryUpdatePage(userId, pageId, pageData) {
        return set(child(this.dbRef, `pages/${userId}/${pageId}`), pageData);
    }

    queryUpdateNoteBlocks(userId, noteId, noteData) {
        return set(child(this.dbRef, `notes/${userId}/${noteId}`), noteData);
    }

    signInWithGoogle() {
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

    signOut() {
        return this.auth.signOut().catch((error) => {
            throw new Error(error.message);
        });
    }

    findUserByEmail(email) {
        return this.getUsers()
            .then((users) => {
                const userId = Object.keys(users).find((key) => users[key].email === email);
                const user = users[Object.keys(users).find((key) => users[key].email === email)];
                return userId
                    ? {
                          ...user,
                          id: userId,
                      }
                    : null;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    isUrlExists(userId, url) {
        return this.queryGetPages(userId)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const pages = snapshot.val();
                    const pageId = Object.keys(pages).find((key) => pages[key].url === url);
                    return pageId ? pageId : false;
                } else {
                    return false;
                }
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

    updateNoteBlocks(userId, noteId, noteData) {
        return this.queryUpdateNoteBlocks(userId, noteId, noteData).catch((error) => {
            throw new Error(error.message);
        });
    }

    getNoteBlocks(userId, pageId) {
        return this.queryGetBlocks(userId, pageId)
            .then((snapshot) => snapshot.val())
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    appendNewPage(userId, pageData) {
        return this.queryAppendNewPage(userId, pageData)
            .then((page) => ({
                ...pageData,
                id: page.key,
            }))
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    updatePage(userId, pageId, pageData) {
        return this.queryUpdatePage(userId, pageId, pageData).catch((error) => {
            throw new Error(error.message);
        });
    }

    saveNewUser(user) {
        return push(ref(this.database, 'users'), user)
            .then((res) => ({
                ...user,
                id: res.key,
            }))
            .catch((error) => {
                throw new Error(error.message);
            });
    }
}

export default new FirebaseService();
