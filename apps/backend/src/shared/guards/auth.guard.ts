import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.auth?.userId;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    request.user = { userId };
    return true;
  }
}
