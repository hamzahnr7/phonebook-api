import { IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  phonenumber: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  description: Text;
}
