import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import propertyRouter from './routes/propertyRoutes.js';
import favoriteRouter from './routes/favoriteRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

await connectDB();

const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send("API is working"));
app.use('/api/user',userRouter)

app.use('/api/properties', propertyRouter);
app.use('/api/favorites', favoriteRouter);


app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
