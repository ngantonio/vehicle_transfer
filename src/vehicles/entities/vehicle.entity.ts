import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  plate: string;

  @Column({ length: 50 })
  service: string;

  @CreateDateColumn()
  created_at: Date;
}
