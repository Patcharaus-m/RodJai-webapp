import { Router } from 'express';
import resFunc from './resFunc';

const router = Router();

router.post('/register', resFunc.registerDevice);
router.post('/wifi', resFunc.sendWiFiConfig);
router.get('/user', resFunc.getUserDevices);

export default router;
