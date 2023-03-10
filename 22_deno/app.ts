import express, { Express, Request, Response } from 'npm:express';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { router } from './routes/main.ts';

const app: Express = express();

app.use(express.json());
app.use('/api', router);

app.listen(config().PORT, () => {
    console.log(`Server running on port ${config().PORT}`);
});