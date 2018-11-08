import firebase from 'firebase'
  
// Initialize Firebase
var config = { CONFIG: 'YOUR CONFIG!' };
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true})

export default firebaseApp.firestore()