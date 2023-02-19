import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinTable, ManyToMany } from 'typeorm';

import { Photo } from './Photo';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Photo)
  @JoinTable()
  favouroute_photos: Photo[];
}
