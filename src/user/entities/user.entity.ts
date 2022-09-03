import { InternalServerErrorException } from '@nestjs/common';
import { hash } from 'bcrypt';
import * as typeorm from 'typeorm';

@typeorm.Entity()
export class User {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column({ type: String, length: 30 })
  name: string;

  @typeorm.Column({ type: String })
  email: string;

  @typeorm.Column({ type: String, length: 12 })
  username: string;

  @typeorm.Column()
  password: string;

  @typeorm.Column({ type: String, length: 12 })
  phonenumber?: string;

  @typeorm.BeforeUpdate()
  async hashBeforeUpdate() {
    try {
      this.password = await hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException(
        'There are some issue before inserting',
      );
    }
  }

  @typeorm.BeforeInsert()
  async hashBeforeInsert() {
    try {
      this.password = await hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException(
        'There are some issue before inserting',
      );
    }
  }
}
