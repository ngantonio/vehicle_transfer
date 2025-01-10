import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { OrganizationalUnit } from '../../organizational_units/entities/organizational_unit.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 50 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];

  @OneToMany(
    () => OrganizationalUnit,
    (organizationalUnit) => organizationalUnit.project,
  )
  organizational_units: OrganizationalUnit[];
}
