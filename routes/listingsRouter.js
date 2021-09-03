import { Router } from 'express';
import {
  getAllListings,
  getSingleListing,
  createNewListing,
  updateListing,
  deleteListing
} from '../controllers/listings.js';
import verifyToken from '../middlewares/verifyToken.js';

const listingsRouter = Router();

listingsRouter.get('/', getAllListings);
listingsRouter.get('/:id', getSingleListing);
listingsRouter.post('/', verifyToken, createNewListing);
listingsRouter.put('/:id', verifyToken, updateListing);
listingsRouter.delete('/:id', verifyToken, deleteListing);

export default listingsRouter;