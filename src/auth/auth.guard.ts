// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   SetMetadata,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Reflector } from '@nestjs/core';
// import { LoggingService } from 'src/logging/logging.service';
// import { IS_PUBLIC_KEY } from './public.decorator';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private reflector: Reflector,
//     private readonly loggerService: LoggingService,
//   ) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
//     if (bearer !== 'Bearer' || !token) {
//       this.loggerService.log(request);
//       throw new UnauthorizedException('User is not authorized');
//     }
//     try {
//       const user = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET_KEY,
//       });
//
//       request.user = user;
//     } catch {
//       this.loggerService.log(request);
//       throw new UnauthorizedException();
//     }
//     return true;
//   }
//
//   private setID(request: Request) {
//     const id = crypto.randomUUID();
//     request['id'] = id;
//     return id;
//   }
// }
