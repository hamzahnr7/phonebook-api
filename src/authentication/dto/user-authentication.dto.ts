import { IsEmail, IsString } from 'class-validator';

export class CreateAuthenticationDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
