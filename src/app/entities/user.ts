import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from './userType';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  secondName?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  isMinor?: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => UserType, { eager: true, nullable: true })
  @JoinColumn()
  typeOfUser?: UserType;

  @Column({ nullable: true })
  accessToken?: string;

  constructor(email?: string, password?: string) {
    this.email = email || '';
    this.password = password || '';
    this.isMinor = this.age ? this.age <= 17 : false;
  }
}
