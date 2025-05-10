import express from "express";
import {
    editUserProfile,
    getUserProfile
} from "../controller/user.profile.controller.js";

const router = express.Router();

router.put("/edit-profile", editUserProfile);

router.get("/getUserProfile", getUserProfile);

export default router;