

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/auth';

const firebaseConfig = {
//add your firebase code here from firbase setting......
};


// export function signup(email ,password){
//   createUserWithEmailAndPassword(auth , email, password);
// }

// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
//const auth = getAuth();
export default fireDb.database().ref();

//const auth = firebase.auth();

//export{auth};
