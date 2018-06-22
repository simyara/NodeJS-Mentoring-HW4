import express from 'express';
import router from './routes/api';

let app = express();

app.use('/', router)

export default app;
