import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthDto } from './dto/user-authentication.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/user')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authenticationService.validateUser(createAuthDto);
    if (!user) throw new UnauthorizedException();
    return this.authenticationService.login(user);
  }
}
