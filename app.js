import express from 'express';
var app = express();

import router from './routes/api';

app.use('/', router)

export default app;