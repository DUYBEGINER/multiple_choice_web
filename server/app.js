import express from "express";
import { signupUser } from "./controllers/authController.js";
const app = express()

app.use(express.json())

app.post('/signup', signupUser);


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/user', (req, res) => {
  const user = req.body;
  res.status(201).json({ message: 'User created', user });
});


export default app;