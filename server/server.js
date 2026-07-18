import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
import connectDB from './config/db.js';
import path from 'path';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ai', aiRoutes);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("/*splat", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
});


connectDB();