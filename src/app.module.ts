import { HomeController } from './Home/home-page.controller';
import { ValidateRequestMiddleware } from './validate-request.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './Home/home-page.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChatGateway } from './gateways/event.gateway';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    HomeModule,
    MongooseModule.forRoot(
      `mongodb+srv://akmalDbManger:Bc17tTsDVanLRNer@cluster0.vrv70pt.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    AuthModule,
    UsersModule,
    HttpModule,
    ThrottlerModule.forRoot({
      ttl: 5,
      limit: 5,
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateRequestMiddleware).forRoutes(HomeController);
  }
}
