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
import Review from './models/reviewModel.js';
import { fileURLToPath } from 'url';
//configure env
dotenv.config()

//database config
connectDB()

//esmodule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//rest object
const app = express();



//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.post('/api/v1/reviews', async (req, res) => {
    try {
      const { rating, reviewText } = req.body;
      const review = new Review({ rating, reviewText });
        await review.save();
        console.log(review);
      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
}); 
  
  app.get('/api/v1/reviews', async (req, res) => {
    try {
      const reviews = await Review.find();
      console.log("Review fetched",reviews);
      res.json(reviews);
    } catch (err) {      
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//rest api
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//port
const PORT = process.env.PORT || 8080;

//RUN LISTEN
app.listen(PORT, () => {
    console.log(`SERVER RUNNING!! ON ${process.env.DEV_MODE} MODE ON PORT ${PORT}`.bgCyan.white);
})