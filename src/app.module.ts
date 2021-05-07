import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastModule } from './podcasts/podcast.module';
import { GraphQLModule } from '../node_modules/@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { UsersResolver } from './users/users.resolver';
import { AuthModule } from './auth/auth.module';
import { Episode } from './podcasts/episode/episode.entity';
import { User } from './users/entites/user.entity';
import { Podcast } from './podcasts/entity/podcast.entity';

@Module({
  imports: [
    PodcastModule, 
    GraphQLModule.forRoot({ 
      autoSchemaFile: true,
      context: ({ req }) => {
        return { user: req['user'] };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      logging: true,
      synchronize: true,
      entities: [Podcast, Episode, User],
    }),
    UsersModule,
    JwtModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    })
  }
}
