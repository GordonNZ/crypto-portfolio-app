// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
//import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBS8SdQO-FANkixqHW7XdUuCJJKJvD9eJ4',
  authDomain: 'cryptoapp-b4e71.firebaseapp.com',
  projectId: 'cryptoapp-b4e71',
  storageBucket: 'cryptoapp-b4e71.appspot.com',
  messagingSenderId: '821519407103',
  appId: '1:821519407103:web:9a403cdd97f7e758bcf9ca',
  measurementId: 'G-KHRVJ98N75',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const gooogleProvider = new GoogleAuthProvider();
