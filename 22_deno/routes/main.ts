import { Router } from 'npm:express';
import { mainController } from '../controllers/main.ts';

export const router = Router();

router.get('/', mainController);