import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { User } from './User';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  title: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne((type) => User)
  @JoinColumn()
  creator: User;
}
