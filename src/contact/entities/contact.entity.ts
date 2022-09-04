import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phonenumber: string;

  @Column()
  name: string;

  @Column('text')
  address: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.contacs)
  user: User;
}
