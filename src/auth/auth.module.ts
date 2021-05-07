import { Module } from '@nestjs/common';
import { APP_GUARD } from '../../node_modules/@nestjs/core';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [UsersModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AuthModule {}
