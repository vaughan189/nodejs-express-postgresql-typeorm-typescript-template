/* eslint-disable no-magic-numbers */
import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';

@Entity({ name: 'user' })
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  @Length(4, 20)
  username!: string;

  @Column()
  @Length(4, 100)
  password!: string;

  @Column()
  @IsNotEmpty()
  role!: string;

  @Column()
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column()
  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt!: Date;

  @BeforeInsert()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnEncryptedPasswordIsValid(unEncryptedPassword: string): boolean {
    return bcrypt.compareSync(unEncryptedPassword, this.password);
  }
}
