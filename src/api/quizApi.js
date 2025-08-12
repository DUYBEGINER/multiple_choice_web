

import { db } from "../dbConfig"; // 🔹 Import db từ file config
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

const quizRef = collection(db, "quizs");

// 🔹 Lấy quiz realtime
export const listenQuizs = (callback) => {
  const q = query(quizRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const addNewQuiz = async (quiz) => {
     await addDoc(quizRef, {
      quiz,
      createdAt: serverTimestamp()
    });
}

