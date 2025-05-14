import express from 'express';
import { 
    createConsignee, 
    getConsigneeProducts, 
    deleteConsignee, 
    getConsigneeById 
} from '../controller/consignee/consignee.controller.js';

const router = express.Router();
 
router.post('/create', createConsignee);
router.get('/products', getConsigneeProducts);
router.get('/:id', getConsigneeById);
router.delete('/delete', deleteConsignee);

export default router; 