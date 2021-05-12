import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'server/common/common.constants';
import { jwtModuleOption } from './jwt.interface';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
    static forRoot(option: jwtModuleOption): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: option,
                },
                JwtService,
            ],
            exports: [JwtService],
        }

    }
}
