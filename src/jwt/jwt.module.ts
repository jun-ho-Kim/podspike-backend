import { Module, DynamicModule } from '@nestjs/common';
import { JwtModuleOption } from './jwt.interface';
import { JwtService } from './jwt.service';
import { CONFIG_OPTIONS } from '../podcasts/common/common.constant';

@Module({})
export class JwtModule  {
    static forRoot(options: JwtModuleOption): DynamicModule {
        return {
            module: JwtModule,
            exports: [JwtService],
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                JwtService
            ]
        }
    } 
}
