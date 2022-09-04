import { InternalServerErrorException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Contact } from 'src/contact/entities/contact.entity';
import * as typeorm from 'typeorm';
import { OneToMany } from 'typeorm';

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

  @OneToMany(() => Contact, (contact) => contact.user)
  contacs: Contact[];

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
