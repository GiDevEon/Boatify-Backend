import mongoose from 'mongoose';
const {
    Schema,
    model,
    Types: { ObjectId }
} = mongoose;

    const listingSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    length: { type: Number, required: true },
    beam: { type: Number, required: true },
    draft: { type: Number, required: true },
    price: { type: Number, required: true },
    cabinsberths: { type: Number, required: true },
    material: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    keeltype: { type: String, required: true },
    propulsion: { type: String, required: true },
    power: { type: Number, required: true },
    type: { type: ObjectId, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export default model('Listing', listingSchema);
