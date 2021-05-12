import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from './jwt/jwt.module';
import { CommonModule } from './common/common.module';
import { CoreEntity } from './common/entities/coreEntity';
import { CoreOutput } from './common/output.dto';
import { Episode } from './podcasts/entity/episode.entity';
import { Podcast } from './podcasts/entity/podcast.entity';
import { PodcastModule } from './podcasts/podcast.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { JwtMiddleware } from './jwt/jwt.middleware';

@Module({
  imports: [
    PodcastModule,
    UserModule,
    CommonModule,
    JwtModule,
    GraphQLModule.forRoot({ 
      autoSchemaFile: true ,
      context: ({req}) => {
        return { user: req['user']};
      }
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      logging: true,
      synchronize: true,
      entities: [Podcast, Episode, CoreEntity, User, CoreOutput, CoreEntity]
    }),
    JwtModule.forRoot({
      privateKey: "nC3mpU2ViYU2XY6t1uw0KseJy9ht6Gwu"
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
    path: '/graphql',
    method: RequestMethod.POST,
    });
  }
}
