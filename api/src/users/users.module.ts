import { Module } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserRepository,
    },
    UserService,
  ],
  exports: ['IUserRepository', UserService, TypeOrmModule],
  controllers: [UserController],
})
export class UsersModule {}
