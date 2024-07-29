import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryService } from 'src/service/cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [UploadController],
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class UploadModule {}
