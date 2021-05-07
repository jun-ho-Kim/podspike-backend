import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entites/user.entity';
import { TypeOrmModule } from '../../node_modules/@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
