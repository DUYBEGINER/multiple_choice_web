import express from "express";
const app = express()


app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/user', (req, res) => {
  const user = req.body;
  res.status(201).json({ message: 'User created', user });
});


export default app;