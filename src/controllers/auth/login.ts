import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      const newUser = new User();
      newUser.username = username;
      await userRepository.save(newUser);
      res.customSuccess(200, 'User successfully created');
    } else {
      res.customSuccess(200, 'User logged in successfully');
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
