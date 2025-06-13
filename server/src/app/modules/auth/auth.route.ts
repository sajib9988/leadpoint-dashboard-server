import { registerUserZodSchema } from './auth.validation';
 import express from 'express';
import { authController } from './auth.controller';
import Validator from '../../middleware/validator';




const router = express.Router();


router.post(
    '/register', Validator(registerUserZodSchema)
    ,authController.registerUser
);  

router.post(
    '/login',
    authController.logInUser
);

router.post(
    '/refresh-token',
    authController.refreshToken
)


export const AuthRoutes = router;