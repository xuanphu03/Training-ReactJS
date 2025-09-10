import express from 'express'
import bodyParser from 'body-parser'
import userRoute from './auth/user.ts'
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use('/auth', userRoute);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
