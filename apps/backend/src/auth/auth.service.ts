import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { FileUploadService } from 'src/fileUpload/file-upload.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async callbackAuth(
    dto: CreateAuthDto,
    image: Express.Multer.File,
  ): Promise<User> {
    const user = await this.userModel.findOne({ clerkId: dto?.clerkId });
    let imageUrl: string;
    if (image) {
      try {
        imageUrl = await this.fileUploadService.uploadFile(image);
      } catch (error) {
        throw new BadRequestException(
          `Failed to upload image: ${error.message}`,
        );
      }
    } else {
      throw new BadRequestException('Image file is required');
    }
    let newUser;
    if (!user) {
      newUser = await this.userModel.create({
        fullName: dto.fullName,
        imageUrl,
        clerkId: dto?.clerkId,
      });
    }
    return newUser;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
