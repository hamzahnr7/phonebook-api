import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: String, length: 12 })
  password: string;

  @Column({ type: String, length: 12 })
  telphone: string;
}
