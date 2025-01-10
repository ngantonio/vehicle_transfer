import { Role } from '../../roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 50 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
