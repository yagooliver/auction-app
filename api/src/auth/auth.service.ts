import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    console.log('SignIn');
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await this.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}
