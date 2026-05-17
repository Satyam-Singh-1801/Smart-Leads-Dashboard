import express from 'express';
import { getLeads, getLeadById, createLead, updateLead, deleteLead } from '../controllers/leadController';
import { protect } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { leadSchema } from '../validators';

const router = express.Router();

router.route('/')
  .get(protect, getLeads)
  .post(protect, validate(leadSchema), createLead);

router.route('/:id')
  .get(protect, getLeadById)
  .put(protect, validate(leadSchema), updateLead)
  .delete(protect, deleteLead);

export default router;
