import { Request, Response } from 'express';
import Lead from '../models/Lead';

// @desc    Get all leads with filtering, sorting, pagination
// @route   GET /api/leads
// @access  Private
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, source, search, sortBy = 'createdAt', sortOrder = 'desc', page = '1', limit = '10' } = req.query;

    const query: any = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } }
      ];
    }

    // Role-based filtering
    if (req.user?.role !== 'Admin') {
      query.createdBy = req.user?._id;
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const sortOpt: any = {};
    sortOpt[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort(sortOpt)
      .skip(skip)
      .limit(limitNum)
      .populate('createdBy', 'name email');

    res.json({
      leads,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');
    if (lead) {
      if (req.user?.role !== 'Admin' && lead.createdBy._id.toString() !== req.user?._id.toString()) {
        res.status(403).json({ message: 'Not authorized to view this lead' });
        return;
      }
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    const lead = new Lead({
      name,
      email,
      status: status || 'New',
      source,
      createdBy: req.user?._id
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      if (req.user?.role !== 'Admin' && lead.createdBy.toString() !== req.user?._id.toString()) {
        res.status(403).json({ message: 'Not authorized to update this lead' });
        return;
      }

      lead.name = req.body.name || lead.name;
      lead.email = req.body.email || lead.email;
      lead.status = req.body.status || lead.status;
      lead.source = req.body.source || lead.source;

      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      if (req.user?.role !== 'Admin' && lead.createdBy.toString() !== req.user?._id.toString()) {
        res.status(403).json({ message: 'Not authorized to delete this lead' });
        return;
      }

      await Lead.deleteOne({ _id: lead._id });
      res.json({ message: 'Lead removed' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
