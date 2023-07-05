import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly userService: UserService) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email or password is incorrect');
  }
}
