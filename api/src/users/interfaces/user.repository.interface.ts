import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByUserId(id: string): Promise<User | null>;
  create(user: User): User;
  save(user: User): Promise<User>;
}
