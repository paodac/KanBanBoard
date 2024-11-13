import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const validPas = await bcrypt.compare(user.password, req.body.password);
        if (!validPas) {
            return res.status(401).json({ message: 'Password does not match' });
        }
        const secretkey = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ username: user.username }, secretkey, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' }); // Manejo de errores
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
