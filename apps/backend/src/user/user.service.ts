import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Message } from 'src/message/entities/message.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}
  async getAllUsers(currentUserId: string) {
    return await this.userModel.find({
      clerkId: { $ne: currentUserId },
    });
  }
  async getMessages(userId: string, myId: string) {
    await this.messageModel
      .find({
        $or: [
          { senderId: userId, receiverId: myId },
          { senderId: myId, receiverId: userId },
        ],
      })
      .sort({ createdAt: 1 });
  }
}
