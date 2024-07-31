import express, { Express } from 'express';
// import cors from 'cors';
import bodyParser from 'body-parser';
import tokenRouter from './routers/tokenRouter';

const app: Express = express();

// app.use(cors());
// app.use(limiter)
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node.js Server!');
});

app.use('/tokens', tokenRouter);

export default app;
