export interface IUserMongo {
  email: string;
  password: string;
  username?: string;

  isVerified: boolean;
  isActive?: boolean;
  userInactiveDate?: Date;
  lastLoginAt?: Date;

  refreshToken?: string;
  resetPasswordToken?: string;

  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export type SignupUserDto = Pick<IUserMongo, 'email' | 'password'>;

export type LoginDto = Pick<IUserMongo, 'email' | 'password'>;
