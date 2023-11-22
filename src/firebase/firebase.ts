import {getDatabase} from "firebase/database";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCJ26YTVTBr2AVfB4S4TvZ-eU0ed_Tq9PM",
    authDomain: "kahoot-talne-7dd59.firebaseapp.com",
    projectId: "kahoot-talne-7dd59",
    storageBucket: "kahoot-talne-7dd59.appspot.com",
    messagingSenderId: "109592796972",
    appId: "1:109592796972:web:060b8efb38f3ce8b021689",
    databaseURL: "https://kahoot-talne-7dd59-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
