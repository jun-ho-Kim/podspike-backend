import { Body, Controller, Delete, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from 'aws-sdk';


const BUCKET_NAME = 'podspike';
const AUDIO_BUCKET_NAME = 'podspike-audio';

interface IBODY {
    url: string
}

@Controller("uploads")
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile() file) {
        AWS.config.update({
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESSKEYID,
                secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
            }
        });
        try {
            const objectName = `${Date.now()}_${file.originalname}`;
            const upload = await new AWS.S3()
            .putObject({
                Key: objectName,
                Body: file.buffer,
                Bucket: BUCKET_NAME,
                ACL: 'bucket-owner-full-control',
            }).promise();
            const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`
            console.log("upload", upload);
            console.log("file", file);
            console.log("url", url)
            return { url };
        } catch(error) {
            console.log(error)
        }
    }
    @Delete()
    async deleteFile(@Body() fileUrl: IBODY) {
        const {url} = fileUrl
        console.log("fileUrl", fileUrl)
        AWS.config.update({
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESSKEYID,
                secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
            }
        });
        await new AWS.S3()
        .deleteObject({
            Bucket: BUCKET_NAME,
            Key: url,
        }, (err, data) => {
            if(err) {
                console.log("AWS deleteFile error", err)
                return err;
            };
            console.log("AWS deleteFile Data", data);
            return data;
        })
    }
};

@Controller('uploads/audio')
export class AudioUploadController {
    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async audioUploadFile(@UploadedFile() file) {
        AWS.config.update({
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESSKEYID,
                secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
            }
        });
        try {
            const objectName = `${Date.now()}_${file.originalname}`
            console.log("file", file);
            const upload = await new AWS.S3().
            putObject({
                Key: objectName,
                Body: file.buffer,
                Bucket: AUDIO_BUCKET_NAME,
                ACL: 'public-read',
            }).promise()
            const url = `https://${AUDIO_BUCKET_NAME}.s3.amazonaws.com/${objectName}`
            console.log("upload", upload);
            console.log("url", url)
            return { url };

        } catch (error) {
            console.log(error);
        }
    }
} 