import express from 'express';
import {
    createAuction,
    getOngoingAuctions,
    placeBid,
    getAuctionDetails,
    completeAuction,
    editAuctions,
    getAuctionsById,
    deleteAuction,
} from '../../controller/seller/auction.controller.js';

import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";

const verifySeller = [verifyTokenForRole, AuthorizeRoles("seller")];

const router = express.Router();
 
router.post('/auction',createAuction);
 
router.get('/ongoing', getOngoingAuctions);

router.get('/getAuctionsById/:id', getAuctionsById);

router.put('/editAuctions/:id', editAuctions);

router.delete('/deleteAuction/:id', deleteAuction);

router.post('/bidding/:id', placeBid);
 
router.get('/userAuctions', getAuctionDetails);

 router.patch('/:auctionId/complete', verifySeller, completeAuction);

 export default router;