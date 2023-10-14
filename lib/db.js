import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://minglunshao888:rHo4hf0XoZBWVOc0@github-ranked.iqi9c4s.mongodb.net/?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log('Connected to MongoDB Atlas');
	} catch (error) {
		console.error('Error connecting to MongoDB Atlas:', error.message);
	}
};

const db = mongoose.connection;

export { connectDB, db };
