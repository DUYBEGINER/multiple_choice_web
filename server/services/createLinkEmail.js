// import { getAuth } from "firebase-admin/auth";


// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for
//   // this URL must be whitelisted in the Firebase Console.
//   url: 'http://localhost:5173/auth/login',
//   // This must be true for email link sign-in.
//   handleCodeInApp: true,
//   // The domain must be configured in Firebase Hosting and owned by the project.
// };


// const userEmail = 'user@example.com';
// getAuth()
//   .generatePasswordResetLink(userEmail, actionCodeSettings)
//   .then((link) => {
//     // Construct password reset email template, embed the link and send
//     // using custom SMTP server.
//     return sendCustomPasswordResetEmail(userEmail, displayName, link);
//   })
//   .catch((error) => {
//     // Some error occurred.
//   });