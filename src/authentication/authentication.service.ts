import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/user-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(createAuthDto: CreateAuthDto) {
    const userData = await this.userService.getUserByEmail(createAuthDto.email);
    const confirmPassword = await compare(
      createAuthDto.password,
      userData.password,
    );
    if (userData && confirmPassword) {
      const { password, ...result } = userData;
      return { ...result };
    }
    return null;
  }

  async login(user: any) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
