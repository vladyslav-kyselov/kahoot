import {getDatabase, onValue, ref, set} from "firebase/database";
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

// const pushSomeData = (name) => {
//     const users = ref(db, '/game/players/'+ name);
//
//     onValue(users, (snapshot) => {
//         const users = snapshot.val();
//         console.log(users)
//     });
// }

//
// const addS = () => {
//     const refs = ref(db, '/game');
//
//     set(refs, {
//         isStarted: false,
//         quizId: 1699746955935,
//         players: {
//             0: {
//                 name: 'Anton',
//                 score: 0,
//             },
//             1: {
//                 name: 'Vlad',
//                 score: 0,
//             }
//         }
//     });
// };
//
//
//
// export const addNewQuiz = (title: string, id: number) => {
//     const refer2 = ref(db, '/quizzes/' + id);
//     set(refer2, {
//         id,
//         title: 'Різдво',
//         questions: {
//             1: {
//                 id: 1,
//                 time: 10,
//                 img: 'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg',
//                 title: 'Question 1',
//                 variantA: 'ans1',
//                 variantB: 'ans2',
//                 variantC: 'ans3',
//                 variantD: 'ans4',
//                 correctVariant: 'ans2'
//             },
//             2: {
//                 id: 2,
//                 time: 10,
//                 img: 'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg',
//                 title: 'Question 2',
//                 variantA: 'ans1',
//                 variantB: 'ans2',
//                 variantC: 'ans3',
//                 variantD: 'ans4',
//                 correctVariant: 'ans2'
//             },
//             3: {
//                 id: 3,
//                 time: 10,
//                 img: 'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg',
//                 title: 'Question 3',
//                 variantA: 'ans1',
//                 variantB: 'ans2',
//                 variantC: 'ans3',
//                 variantD: 'ans4',
//                 correctVariant: 'ans2'
//             }
//         }
//     });
// };



export const addNewUser = (name: string, pin?: number) => {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data[name]) {
            // handle modal error "that name is already used"
        } else {
            const reference = ref(db, '/users/' + name);
            set(reference, {
                name,
                score: "0",
                totalScore: "0",
                enteredRoom: pin || null
            });
        }
    });
};

// addNewUser('Anton');
