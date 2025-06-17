import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, pass: string) {
    const user = await this.userService.create({
      login: username,
      password: pass,
    });

    return { id: user.id };
  }

  async signIn(username: string, pass: string) {
    const user = await this.userService.getByLogin(username);

    const isPasswordMatches = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatches) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, login: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async refresh(refrestToken: string) {
    if (refrestToken === undefined) {
      throw new UnauthorizedException();
    }

    try {
      const { userId } = await this.jwtService.verifyAsync(refrestToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const user = await this.userService.getById(userId);

      const updatedPayload = { userId: user.id, login: user.login };

      return {
        accessToken: await this.jwtService.signAsync(updatedPayload, {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }),
        refreshToken: await this.jwtService.signAsync(updatedPayload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } catch {
      throw new ForbiddenException();
    }
  }
}
