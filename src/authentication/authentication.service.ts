import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthenticationDto } from './dto/user-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async userLogin(createAuthenticationDto: CreateAuthenticationDto) {
    const { email, password } = createAuthenticationDto;
    const userData = await this.userRepository.findOne({ where: { email } });
    if (userData) {
      const confirmPassword = await compare(password, userData.password);
      if (!confirmPassword) throw new UnauthorizedException();
      const userToken = this.jwtService.sign({ ...userData });
      return { userToken };
    }
    throw new UnauthorizedException();
  }
}
