import { Router } from 'express';

import auth from './auth';
import photos from './photos';

const router = Router();

router.use('/auth', auth);
router.use('/photos', photos);

export default router;
