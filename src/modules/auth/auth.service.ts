import { LoginDto, SignupUserDto } from '@/interfaces/user.interface';
import { User } from '@/models';
import { UserService } from '../users/users.service';
import { CustomError } from '@/utils/custom-error';
import { HTTP_STATUS } from '@/utils/response-creator';
import { generateAuthTokens } from '@/utils/jwt';

export class AuthService {
  static async signUp(reqData: SignupUserDto) {
    const userExists = await UserService.exists(reqData.email);

    if (userExists) {
      throw new CustomError(HTTP_STATUS.CONFLICT, 'User already exists.');
    }

    const newUser = await User.create(reqData);
    const payload = { _id: newUser._id };

    const tokens = await generateAuthTokens(payload);

    await UserService.updateUser(newUser._id, { refreshToken: tokens.refresh.token });

    return { ...payload, ...tokens };
  }

  static async login(reqData: LoginDto) {
    const checkUser = await UserService.comparePassword(reqData.email, reqData.password);

    const payload = { _id: checkUser._id };
    const tokens = await generateAuthTokens(payload);
    await UserService.updateUser(checkUser._id, { refreshToken: tokens.refresh.token });
    return { ...payload, ...tokens };
  }
}
