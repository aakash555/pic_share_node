import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Photo } from 'orm/entities/Photo';
import { User } from 'orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const listPhoto = async (req: Request, res: Response, next: NextFunction) => {
  const photoRepository = getRepository(Photo);
  const userRepository = getRepository(User);
  const { skip, username } = req.body;
  try {
    const [photos, total] = await photoRepository.findAndCount({
      relations: ['creator'],
      order: { created_at: 'DESC' },
      take: 12,
      skip: skip,
    });
    const data = [];
    let userFavourotes = null;
    if (username) {
      const user = await userRepository.find({
        where: { username: username },
        relations: ['favouroute_photos', 'favouroute_photos.creator'],
      });
      userFavourotes = user[0].favouroute_photos;
    }
    for (const photo of photos) {
      const append_photo = {
        url: photo.url,
        title: photo.title,
        username: photo.creator.username,
        id: photo.id,
        isFavorite: false,
        uploadedOn:
          photo.created_at.getDate() + '/' + photo.created_at.getMonth() + '/' + photo.created_at.getFullYear(),
      };
      if (userFavourotes && username) {
        userFavourotes.map((pic) => {
          if (pic.id == photo.id) {
            append_photo.isFavorite = true;
          }
        });
      }
      data.push(append_photo);
    }
    res.customSuccess(200, 'List of photos.', data);
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of photos.`, null, err);
    return next(customError);
  }
};
