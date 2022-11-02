import express from 'express';
import { signin } from '../controllers/sigin';
import { signout } from '../controllers/signout';
import { signup } from '../controllers/signup';
import { body } from 'express-validator';
import { getCurrentUser } from '../controllers/get-current-user';
import { validateRequest } from '../middlewares/validate-request';
import { PasswordManager } from '../util/password-manager';

const userRouter = express.Router();

userRouter.post(
  '/signup',
  [
    body('name')
      .isLength({ min: 4 })
      .withMessage('name should have atleast four characters'),
    body('email').trim().isEmail().withMessage('enter valid email'),
    body('password')
      .custom((password) => PasswordManager.validatePassword(password))
      .withMessage(
        'Password must be atleast eight characters and contain atleast one special,one lowercase, one uppercase, one digit'
      ),
  ],
  validateRequest,
  signup
);

userRouter.post(
  '/signin',
  [
    body('email').trim().isEmail().withMessage('enter valid email'),
    body('password')
      .custom((password) => PasswordManager.validatePassword(password))
      .withMessage(
        'Password must be atleast eight characters and contain atleast one special,one lowercase, one uppercase, one digit'
      ),
  ],
  validateRequest,
  signin
);
userRouter.put('/signout', signout);
userRouter.post('/currentuser', getCurrentUser);

export { userRouter };
