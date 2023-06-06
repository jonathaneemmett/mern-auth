import jwt from 'jsonwebtoken';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import User from '../models/User.js';

const protect = asyncErrorHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.userId).select('-password');
			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized, invalid token');
		}
	} else {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

export { protect };
