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
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  isMinor: boolean;

  @Column()
  password: string;

  @ManyToOne(() => UserType, { eager: true })
  @JoinColumn()
  typeOfUser: UserType;

  constructor() {
    this.isMinor = this.age <= 17;
  }
}
