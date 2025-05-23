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
    getCurrentLeftTime, 
    getAuctionStatus,  
    getSimilarAuctions
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

router.get('/getCurrentLeftTime/:id', getCurrentLeftTime);

router.post('/bidding', placeBid);

router.patch('/:auctionId/auctionStatus', getAuctionStatus);

router.get('/userAuctions', getAuctionDetails);

router.patch('/:auctionId/complete', verifySeller, completeAuction);

router.get('/similarAuctions/:id', getSimilarAuctions);

 export default router;