import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  phonenumber: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  description: string;
}
