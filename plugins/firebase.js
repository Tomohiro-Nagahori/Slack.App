import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if(!firebase.apps.length){
    const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STRAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID
      };
      console.log(config)
      firebase.initializeApp(config);
}

const db =firebase.firestore()

export{
    firebase,
    db
}
