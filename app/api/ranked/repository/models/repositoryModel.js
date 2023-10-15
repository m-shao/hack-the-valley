import mongoose, { Schema, model } from 'mongoose';

const repositorySchema = Schema({
	owner: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	users: [
		{
			username: {
				type: String,
				required: true,
				unique: true,
			},
			commits: [
				{
					rating: {
						type: Number,
						required: true,
					},
					message: {
						type: String,
						required: true,
					},
				},
			],
		},
	],
});

const RepositoryModel =
	mongoose.models.RepositoryModel ||
	model('RepositoryModel', repositorySchema);
export default RepositoryModel;
