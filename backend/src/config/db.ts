import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4
    };

    await mongoose.connect(mongoURI);

    mongoose.connection.on('connected', () => {
      console.log('✅ Database connection established');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Database connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Database connection lost');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('✅ Database connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error during database disconnection:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ Database connection error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
};

export default connectDB; 