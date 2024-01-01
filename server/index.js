import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connection from './db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import path  from 'path'


dotenv.config();
connection();

const __dirname= express()

const app = express();


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



app.use(cors());

app.use(express.json());

app.use(cookieParser());


app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
// app.use('/api/openai',openaiRoutes)


const port  = process.env.PORT || 5000;

app.listen(port, () => {

    console.log(`Server listining on port http://localhost:${port}`);
})
