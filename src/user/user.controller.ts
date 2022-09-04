import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.registerUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.getAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findOne(@Req() req: Request) {
    return this.userService.getUserInfo(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @HttpCode(204)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserInfo(+req.user, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
