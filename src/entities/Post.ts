/* eslint-disable no-magic-numbers */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Length } from 'class-validator';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  @Length(4, 20)
  title!: string;

  @Column()
  @Length(4, 500)
  content!: string;

  @Column()
  @Length(4, 20)
  category!: string;

  @Column()
  @Length(4, 20)
  tags!: string;

  @Column()
  userId!: number;

  @Column()
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column()
  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt!: Date;
}
