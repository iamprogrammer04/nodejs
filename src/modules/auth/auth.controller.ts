import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { createResponse, HTTP_STATUS } from '@/utils/response-creator';

export class AuthController {
  static async signUp(req: Request, res: Response) {
    const reqData = req.body;
    const response = await AuthService.signUp(reqData);
    res
      .status(HTTP_STATUS.CREATED)
      .send(createResponse(HTTP_STATUS.CREATED, 'Registered successfully.', response));
  }

  static async login(req: Request, res: Response) {
    const reqData = req.body;
    const response = await AuthService.login(reqData);
    res
      .status(HTTP_STATUS.OK)
      .send(createResponse(HTTP_STATUS.OK, 'Logged in successfully.', response));
  }
}
