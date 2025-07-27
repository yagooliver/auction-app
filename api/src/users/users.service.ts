import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateBuyer } from './dtos/create-user.dto';
import { UserRole } from './entities/user.enum';
import { IUserRepository } from './interfaces/user.repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepo.findByEmail(email);
  }

  async createBuyer(createBuyer: CreateBuyer): Promise<User> {
    const password = await this.encrypt(createBuyer.password);

    const user = new User(
      createBuyer.email,
      createBuyer.name,
      password,
      UserRole.BUYER,
    );

    this.usersRepo.create(user);
    return await this.usersRepo.save(user);
  }

  private async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
