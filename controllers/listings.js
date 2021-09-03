import Listing from '../models/BoatListing.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find().populate('seller');
  res.json(listings);
});

export const getSingleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Post.findById(id).populate('seller');
  if (!listing) throw new ErrorResponse(`Listing with id of ${id} not found`, 404);
  res.json(listing);
});

export const createNewListing = asyncHandler(async (req, res) => {
  const { make, model, year, length, beam, draft, price, 
    cabinsberths, material, location, type, keeltype, propulsion, power,
    description, date } = req.body;
  const { _id: seller } = req.user;
  if ( !seller || !make || !model || !year || !length || !beam || !draft || !price || !cabinsberths || !material || !location || !type || !keeltype || !propulsion || !power || !description || !date )
    throw new ErrorResponse('Make, model, year, length, beam, draft, price cabinsberths, material, location, type, keeltype, propulsion, power and description are required fields');
  const newListing = await Listing.create({
    make, model, year, length, beam, draft, price, 
    cabinsberths, material, location, type, keeltype, propulsion, power,
    description, date
  });
  res.status(201).json(newListing);
});

export const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: seller } = req.user;
  const { make, model, year, length, beam, draft, price, 
    cabinsberths, material, location, type, keeltype, propulsion, power,
    description, date } = req.body;
  if ( make || !model || !year || !length || !beam || !draft || !price || !cabinsberths || !material || !location || !type || !keeltype || !propulsion || !power || !description || !date )
    throw new ErrorResponse('Make, model, year, length, beam, draft, price cabinsberths, material, location, type, keeltype, propulsion, power and description are required fields');
  const lsiting = await Listing.findById(id);
  if (!listing) throw new ErrorResponse(`Listing with id of ${id} not found`, 404);
  if (String(listing.seller) !== String(seller))
    throw new ErrorResponse(`Cannot edit another user's listing`, 401);
  const updatedPost = await Listing.findOneAndUpdate(
    { _id: id },
    { make, model, year, length, beam, draft, price, 
      cabinsberths, material, location, type, keeltype, propulsion, power,
      description, date },
    { new: true }
  );
  res.json(updatedListing);
});

export const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: seller } = req.user;
  const listing = await Listing.findById(id);
  if (!listing) throw new ErrorResponse(`Listing with id of ${id} not found`, 404);
  if (String(listing.seller) !== String(seller))
    throw new ErrorResponse(`Cannot delete another user's listing`, 401);
  await listing.delete();
  res.json({ success: `Listing with id of ${id} was deleted` });
});
