import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  jobType: String,
  logo: String,
  description: String,
  images: [String],
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
