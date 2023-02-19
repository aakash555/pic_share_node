import { Router } from 'express';

import { addPhoto, listPhoto, setFavouroutePhoto, listFavouroute } from 'controllers/photos';
import { validatorLogin } from 'middleware/validation/auth';

const router = Router();

router.post('/add', [validatorLogin], addPhoto);

// Todo: Make this as Get
router.post('/list', [], listPhoto);

router.post('/setfavouroute', [validatorLogin], setFavouroutePhoto);

// Todo: Make this as Get
router.post('/listFavouroute', [validatorLogin], listFavouroute);

export default router;
