import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { clerkClient } from '@clerk/express';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.auth?.userId;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await clerkClient.users.getUser(userId);
    const isAdmin =
      user?.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      throw new ForbiddenException('Forbidden');
    }

    request.user = {
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
    };

    return true;
  }
}
