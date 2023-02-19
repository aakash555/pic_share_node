import { Request, Response, NextFunction } from 'express';
import { getRepository, getConnection } from 'typeorm';

import { Photo } from 'orm/entities/Photo';
import { User } from 'orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const setFavouroutePhoto = async (req: Request, res: Response, next: NextFunction) => {
  const { username, photo_id, is_set_favouroute_request } = req.body;

  const photoRepository = getRepository(Photo);
  const userRepository = getRepository(User);
  try {
    const photo = await photoRepository.findOne({ where: { id: photo_id } });
    const user = await userRepository.findOne({ where: { username: username } });

    if (!photo || !user) {
      const customError = new CustomError(400, 'General', 'Wrond Inputs does not exist', ['Photo/User do not exist']);
      return next(customError);
    }

    //Todo: Handle Cases where if favouroute entry is being set with same state
    const is_photo_preset_as_favouroute = user.favouroute_photos?.find((photo) => photo.id !== photo_id);
    if (is_set_favouroute_request) {
      if (!is_photo_preset_as_favouroute) {
        await getConnection().createQueryBuilder().relation(User, 'favouroute_photos').of(user).add(photo);
        res.customSuccess(200, 'User Favoroute status updated');
      } else {
        const customError = new CustomError(400, 'General', 'Photo Already a Favouroute', [
          'Photo Already a Favouroute',
        ]);
        return next(customError);
      }
    } else {
      user.favouroute_photos = user.favouroute_photos.filter((photo) => photo.id !== photo_id);
      await userRepository.save(user);
      res.customSuccess(200, 'User Favoroute status updated');
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
