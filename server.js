import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
//configure env
dotenv.config()

//database config
connectDB()

//rest object
const app = express();



//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//---------------------deployment -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build' , 'public')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "public", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}
//---------------------deployment-------------------
//rest api
app.get("/", (req, res) => {    
    res.send("<h1>Welcome to ecommerce app</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//RUN LISTEN
app.listen(PORT, () => {
    console.log(`SERVER RUNNING!! ON ${process.env.DEV_MODE} MODE ON PORT ${PORT}`.bgCyan.white);
})