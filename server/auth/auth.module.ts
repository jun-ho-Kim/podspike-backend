import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard,
        // },
    ],
})
export class AuthModule {}