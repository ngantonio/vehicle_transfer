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

  @Column({ nullable: true, length: 50 })
  plate: string;

  @Column({ nullable: true, length: 50 })
  service: string;

  @CreateDateColumn()
  created_at: Date;
}
