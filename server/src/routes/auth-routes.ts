import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {createUser} from '../controllers/user-controller.js'

export const login = async (req: Request, res: Response) => {
  //console.log("REq Obj: ", req);
  console.log("REq Body: ", req.body);   //  { username: '', password: '' }
  // TODO: If the user exists and the password is correct, return a JWT token
  try{
    const user= await User.findOne({where:{username:req.body.username}})
    // vaildate that USer Exists
    if (!user){
      return res.status(401).json({message: 'User not found'})
    } 

    const validPas= await bcrypt.compare(req.body.password, user.password )
    console.log(user.password, req.body.password, validPas);
    
    if (!validPas){
      return res.status(401).json({message: 'Password does not match'})
    }

    const secretkey= process.env.JWT_SECRET_KEY||''
    const token= jwt.sign({username:user.username}, secretkey, {expiresIn:'1h'})

    return res.status(200).json({token})
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' }); // Manejo de errores
  }

};

const router = Router();

// All of theses routes are PREFIXED with '/auth'
// POST /login - Login a user
router.post('/login', login);
router.post('/', createUser);

export default router;
