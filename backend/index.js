import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5100;

const app = express();

/* Database */
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, 'frontend/dist')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')),
	);
} else {
	app.get('/', (req, res) => {
		res.send('Server is ready...');
	});
}

/* Error Handling */
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
