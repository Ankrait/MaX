import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UsersModule, AuthModule, DbModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
