import { Router } from 'express';
import checkRugPull from '../controllers/checkRugPull';

const router = Router();

router.get('/rugcheck/:address', checkRugPull);

export default router;
