import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { Project } from '../../projects/entities/project.entity';
import { OrganizationalUnit } from '../../organizational_units/entities/organizational_unit.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  username: string;

  @Column({ nullable: true, length: 50 })
  email: string;

  @Column({ nullable: true, length: 100 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({
    name: 'users_projects',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'project_id',
    },
  })
  projects: Project[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @ManyToMany(
    () => OrganizationalUnit,
    (organizational_unit) => organizational_unit.users,
  )
  @JoinTable({
    name: 'users_organizationalUnits',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'organizationalUnit_id',
    },
  })
  organizational_units: OrganizationalUnit[];
}
