import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
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
import { AuthModule } from './auth/auth.module';
import { Review } from './podcasts/entity/review.entity';
import { SqlInMemory } from 'typeorm/driver/SqlInMemory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'production', 'test')
          .required(),
          DB_HOST: Joi.string(),
          DB_PORT: Joi.string(),
          DB_USERNAME: Joi.string(),
          DB_PASSWORD: Joi.string(),
          DB_NAME: Joi.string(),
          PRIVATE_KEY: Joi.string(),          
      })
    }),
    PodcastModule,
    UserModule,
    CommonModule,
    JwtModule,
    AuthModule,
    GraphQLModule.forRoot({
      playground: true,
      introspection: true,
      autoSchemaFile: true ,
      context: ({req}) => {
        return { user: req['user']};
      }
    }),
    TypeOrmModule.forRoot({
      ...(process.env.NODE_ENV === 'production' ?
        {
          type: 'postgres',
        ...(process.env.DATABASE_URL
          ? {
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
          }
          : {
            ssl: { rejectUnauthorized: false },
          }),
          }
          :{type: 'sqlite', database: 'db.sqlite'}),
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',      
      entities: [Podcast, Episode, CoreEntity, User, CoreOutput, CoreEntity, Review]
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
