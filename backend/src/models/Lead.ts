import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface ILead extends Document {
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdBy: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Lost'], 
    default: 'New' 
  },
  source: { 
    type: String, 
    enum: ['Website', 'Instagram', 'Referral'], 
    required: true 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
});

// Adding index for search functionality
leadSchema.index({ name: 'text', email: 'text' });

const Lead = mongoose.model<ILead>('Lead', leadSchema);
export default Lead;
