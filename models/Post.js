import mongoose from 'mongoose';
const {
  Schema,
  model,
  Types: { ObjectId }
} = mongoose;

const postSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: int, required: true },
  length: { type: Float, required: true },
  beam: { type: Float, required: true },
  draft: { type: Float, required: true },
  price: { type: Float, required: true },
  cabinsberths: { type: Int, required: true },
  material: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  keeltype: { type: String, required: true },
  propulsion: { type: String, required: true },
  power: { type: Int, required: true },
  type: { type: ObjectId, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default model('Post', postSchema);
