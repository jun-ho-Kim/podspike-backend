import { Module } from '@nestjs/common';
import { AudioUploadController, UploadController } from './uploads.controller';

@Module({
    controllers: [UploadController, AudioUploadController]
})
export class UploadsModule {}
