// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

// @ts-ignore
import express, {Router} from 'express';
// @ts-ignore
import serverless from 'serverless-http';

const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

api.use('/api/', router);

export const handler = serverless(api);
