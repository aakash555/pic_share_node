import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const listFavouroute = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.find({
      where: { username: username },
      relations: ['favouroute_photos', 'favouroute_photos.creator'],
    });
    const user_favouroute_photos = user[0].favouroute_photos;
    const data = [];
    for (const photo of user_favouroute_photos) {
      const append_photo = {
        url: photo.url,
        title: photo.title,
        username: photo.creator.username,
        id: photo.id,
        isFavorite: true,
        uploadedOn:
          photo.created_at.getDate() + '/' + photo.created_at.getMonth() + '/' + photo.created_at.getFullYear(),
      };
      data.push(append_photo);
    }
    res.customSuccess(200, 'List of Photos.', data);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
