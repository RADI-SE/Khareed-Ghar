import express from "express";
import {
  
  getUsersByRole,
  editUserProfile,
  displayUserProfile,
  banUsers,
  unbanUsers,
} from "../../controller/admin/user.controller.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();

 
const verifyAdmin = [verifyTokenForRole, AuthorizeRoles("admin")];

router.get("/moderators", verifyAdmin, (req, res) => getUsersByRole(req, res, 'moderator')); 

router.post("/sellers", verifyAdmin, getUsersByRole);  
router.get("/buyers", verifyAdmin, (req, res) => getUsersByRole(req, res, 'buyer')); 

router.get("/user/:id", verifyTokenForRole, displayUserProfile); 

router.put("/user/:id", verifyTokenForRole, editUserProfile); 

router.put("/ban-user/:id", verifyAdmin, banUsers);  
router.put("/unban-user/:id", verifyAdmin, unbanUsers);  

export default router;
