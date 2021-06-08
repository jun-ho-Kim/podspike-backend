import { Body, Controller, Delete, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from 'aws-sdk';
import { BucketKey } from "aws-sdk/clients/codestar";


const BUCKET_NAME = 'podspike';

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
        AWS.config.update({
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESSKEYID,
                secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
            }
        });
        const upload = await new AWS.S3()
        await upload.deleteObject({
            Bucket: BUCKET_NAME,
            Key: url
        }, (err, data) => {
            if(err) {
                console.log("AWS deleteFile error", err)
                return err;
            };
            console.log("AWS deleteFile Data", data);
            return data;
        })
    }
}