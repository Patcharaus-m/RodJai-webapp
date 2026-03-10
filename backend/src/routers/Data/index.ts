import { Router } from 'express';
import resFunc from './resFunc';

const router = Router();

// Endpoint: /api/sensor/history
router.get('/sensor/history', resFunc.getSensorHistory);

export default router;