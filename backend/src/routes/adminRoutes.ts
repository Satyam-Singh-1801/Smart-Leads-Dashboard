import express from 'express';
import { getSalesmen, deleteSalesman, getAnalytics } from '../controllers/adminController';
import { protect, adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.route('/users').get(getSalesmen);
router.route('/users/:id').delete(deleteSalesman);
router.route('/analytics').get(getAnalytics);

export default router;
