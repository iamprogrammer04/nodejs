import { IUserMongo } from '@/interfaces/user.interface';
import { User } from '@/models';
import { CustomError } from '@/utils/custom-error';
import { HTTP_STATUS } from '@/utils/response-creator';
import { Types } from 'mongoose';

export class UserService {
  static async exists(email: string): Promise<IUserMongo | boolean> {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return findUser;
    }
    return false;
  }

  static async updateUser(userId: Types.ObjectId, updateData: Partial<IUserMongo>) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  static async comparePassword(email: string, inputPassword: string) {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, 'User email not found.');
    }

    const isPasswordMatch = await findUser.matchPassword(inputPassword);

    if (!isPasswordMatch) {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Input password does not match.');
    }

    return findUser;
  }
}
