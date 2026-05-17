import { Request, Response } from 'express';
import User from '../models/User';
import Lead from '../models/Lead';

// @desc    Get all salesmen
// @route   GET /api/admin/users
// @access  Private/Admin
export const getSalesmen = async (req: Request, res: Response): Promise<void> => {
  try {
    const salesmen = await User.find({ role: 'Sales User' }).select('-password');
    res.json(salesmen);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete salesman
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteSalesman = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (user && user.role === 'Sales User') {
      // Also delete leads created by this user? Up to business logic, let's keep leads for now, or just delete user.
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'Salesman removed' });
    } else {
      res.status(404).json({ message: 'Salesman not found or cannot delete Admin' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalSalesmen = await User.countDocuments({ role: 'Sales User' });
    
    // recent leads
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5).populate('createdBy', 'name');

    // Leads by status
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalLeads,
      totalSalesmen,
      recentLeads,
      leadsByStatus
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
