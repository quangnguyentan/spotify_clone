import {
  Controller,
  Get,
  Param,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Request() req: any, @Response() res: any) {
    const currentUserId = req.auth.userId;
    try {
      const users = await this.userService.getAllUsers(currentUserId);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching users.',
      });
    }
  }
  @Get('messages/:id')
  @UseGuards(AuthGuard)
  async getMessages(
    @Param('id') userId: string,
    @Request() req: any,
    @Response() res: any,
  ) {
    const myId = req.auth.userId;
    try {
      const messages = await this.userService.getMessages(userId, myId);
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching users.',
      });
    }
  }
}
