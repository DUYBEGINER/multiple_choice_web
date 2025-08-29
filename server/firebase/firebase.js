import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default app;
