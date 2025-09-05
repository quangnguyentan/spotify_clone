import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { FileUploadModule } from 'src/fileUpload/file-upload.module';

@Module({
  imports: [UserModule, CloudinaryModule, FileUploadModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
