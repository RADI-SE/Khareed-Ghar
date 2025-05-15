import express from 'express';
import { 
    acceptConsignment, 
    getConsigneeProducts, 
    deleteConsignee, 
    getConsigneeById,
    } from '../controller/consignee/consignee.controller.js';
import { updateProductForConsignment } from '../controller/seller/product.controller.js';

const router = express.Router();
 
router.post('/accept-consignment', acceptConsignment);
router.put('/update-consignment/:id', updateProductForConsignment);
router.get('/get-consigned-products', getConsigneeProducts);
router.get('/:id', getConsigneeById);
router.delete('/delete-consignee/:id', deleteConsignee);

export default router; 