const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "once-upon-a-budget.firebaseapp.com",
    projectId: "once-upon-a-budget",
    storageBucket: "once-upon-a-budget.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export default firebaseConfig;
