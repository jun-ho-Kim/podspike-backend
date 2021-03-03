import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query } from '../node_modules/@nestjs/graphql';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get("/:id")
  // getId(): string {
  //   return "hello id";
  // }
  
}
