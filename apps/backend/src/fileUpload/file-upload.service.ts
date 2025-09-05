import { Injectable } from '@nestjs/common';
import { promises as fsp } from 'fs'; // Sử dụng alias fsp cho fs.promises
import * as fs from 'fs'; // Import fs thông thường
import { join, resolve } from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    if (!file.path) {
      throw new Error('File path is missing');
    }

    const uploadDir = resolve(process.cwd(), 'src', 'upload');
    try {
      await fsp.mkdir(uploadDir, { recursive: true });
      console.log('Upload directory created or verified:', uploadDir);

      const fileName = `${Date.now()}-${file.originalname}`;
      const sourcePath = file.path;
      const destinationPath = join(uploadDir, fileName);

      console.log('Source path:', sourcePath);
      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file does not exist: ${sourcePath}`);
      }

      await fsp.rename(sourcePath, destinationPath);
      if (!fs.existsSync(destinationPath)) {
        throw new Error(`Failed to move file to: ${destinationPath}`);
      }

      await fsp.access(destinationPath);
      console.log('File successfully saved at:', destinationPath);
      return `/upload/${fileName}`;
    } catch (error) {
      console.error('File upload error:', error.message);
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}
