import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Photo } from 'orm/entities/Photo';
import { User } from 'orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const addPhoto = async (req: Request, res: Response, next: NextFunction) => {
  const { title, url, username } = req.body;

  const photoRepository = getRepository(Photo);
  const userRepository = getRepository(User);
  try {
    const photo = await photoRepository.findOne({ where: { url } });
    if (photo) {
      const customError = new CustomError(400, 'General', 'Photo already exists', ['Photo already exists']);
      return next(customError);
    }
    const newPhoto = new Photo();
    const creator = await userRepository.findOne({ where: { username: username } });
    newPhoto.url = url;
    newPhoto.title = title;
    newPhoto.creator = creator;
    console.log(newPhoto);
    const savedData = await photoRepository.save(newPhoto);
    const data = {
      url: savedData.url,
      title: savedData.title,
      username: savedData.creator.username,
      id: savedData.id,
      uploadedOn: savedData.created_at,
    };
    res.customSuccess(200, 'Photo successfully added.', data);
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
