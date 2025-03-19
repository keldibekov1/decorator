import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwt: JwtService) {}
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      let request: Request = context.switchToHttp().getRequest();
      let token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        let data = this.jwt.verify(token);
        request['user'] = data.id;
        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }
  