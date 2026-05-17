import bcrypt from 'bcryptjs';
import User from '../models/User';

export const initAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'Admin' });

    if (!adminExists) {
      console.log('No Admin found. Creating default Admin...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      await User.create({
        name: 'Super Admin',
        email: 'admin@smartleads.com',
        password: hashedPassword,
        role: 'Admin',
      });
      console.log('Default Admin created: admin@smartleads.com / admin123');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};
