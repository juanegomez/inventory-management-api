import express from 'express';
import cors from 'cors';
import passport from 'passport';
import './config/passport';
const app = express();

//Cors
app.use(cors());

app.use(express.json());

app.use(passport.initialize());

export default app;
