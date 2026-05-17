import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`);
    console.log('Falling back to MongoMemoryServer...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`Memory MongoDB Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`Memory DB Error: ${(memError as Error).message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
