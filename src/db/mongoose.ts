import { connect } from 'mongoose';

// connect Mongoose to MongoDB Server
connect(process.env.MONGODB_URL!);
