import { InternalServerErrorException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, length: 30 })
  name: string;

  @Column({ type: String })
  email: string;

  @Column({ type: String, length: 12 })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: String, length: 12 })
  phonenumber?: string;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException(
        'There are some issue before inserting',
      );
    }
  }
}
