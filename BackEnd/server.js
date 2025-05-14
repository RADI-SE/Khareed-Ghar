import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./database/db.connection.js";
import authRoutes from "./route/auth.user.route.js";
import manageUsers from "./route/admin/manage.user.js"
import manageCategories from "./route/admin/manage.category.js"
import manageAddresses from "./route/admin/manage.address.js"
import manageProducts from "./route/admin/manage.product.js"
import cartRoutes from "./route/buyer/cart.routes.js"
import addLocation from "./route/buyer/location.routes.js"
import manageAuctions from "./route/seller/auction.route.js"
import orderRoutes from "./route/order.route.js"
import notificationRoutes from "./route/notification.route.js"
import sellerStoreRoutes from "./route/seller/seller.store.route.js"
import manageCarousel from "./route/admin/manage.carousel.js"
import editUserProfile from "./route/edit.profile.route.js";
import searchRoutes from "./route/buyer/search.routes.js";
import feedbackRoutes from "./route/feedback.route.js";
import consigneeRoutes from "./routes/consignee.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());

const PORT = process.env.PORT || 5003;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],   
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // enable set cookie  
}));

// Serve static files from the frontend public directory
app.use('/uploads', express.static(path.join(__dirname, '../../FrontEnd/public/images/uploads')));

app.use("/api/auth", authRoutes);

app.use("/api", manageUsers);

app.use("/api", manageCategories);

app.use("/api", manageAddresses);

app.use("/api", cartRoutes);

app.use("/api", addLocation);

app.use("/api", manageProducts);

app.use("/api", manageAuctions);

app.use("/api", orderRoutes);

app.use("/api", notificationRoutes);

app.use("/api", sellerStoreRoutes);

app.use("/api", manageCarousel);

app.use("/api", editUserProfile);

app.use("/api", searchRoutes);

app.use("/api", feedbackRoutes);

app.use("/api/consignee", consigneeRoutes);

app.listen(PORT, () => {

  connect();

  console.log(`Server is running at http://localhost:${PORT}/api/`);
});
//radiapple15
// 6c9F1K2FquxohvPe