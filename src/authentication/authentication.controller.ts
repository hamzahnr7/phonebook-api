import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/user-authentication.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/user')
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.userLogin(createAuthenticationDto);
  }
}
