import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByUserId(id: string): Promise<User | null> {
    return await this.repo.findOne({ where: { id: id } });
  }

  create(user: User): User {
    return this.repo.create(user);
  }
  save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email: email } });
  }
}
