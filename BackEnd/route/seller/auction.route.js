import express from 'express';
import {
    createAuction,
    getOngoingAuctions,
    placeBid,
    getAuctionDetails,
    completeAuction,
} from '../../controller/seller/auction.controller.js';

import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";

const verifySeller = [verifyTokenForRole, AuthorizeRoles("seller")];

const router = express.Router();
 
router.post('/auction',createAuction);
 
router.get('/ongoing', getOngoingAuctions);
 
router.post('/auction-bid', verifySeller, placeBid);
 
router.get('/:auctionId', getAuctionDetails);

 router.patch('/:auctionId/complete', verifySeller, completeAuction);

 export default router;

