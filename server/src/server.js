import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';



const app = express();

// app.use(express.json());
dotenv.config();
app.use(cors());

app.post("/login", (req, res) => {
  console.log(req);      // Request object exists
  console.log(req.body); // undefined without body parser
});

console.log(process.env);

const port = process.env.POST || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});